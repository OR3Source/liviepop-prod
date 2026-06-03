import { useState, useEffect, useCallback } from 'react'
import Keyboard from '../components/Keyboard'
import FallingFlowers from '../components/FallingFlowers'
import Grid from '../components/Grid'
import WordErrorPopup from '../components/WordErrorPopup'
import PuzzleExpiryPopup from '../components/PuzzleExpiryPopup'
import { supabase } from '../lib/supabase'
import './Game.css'

const getGuestStorageKey = (puzzleId) => `wordle_state_guest_${puzzleId}`

function Game() {
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [showHelp] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState({})
  const [phrase, setPhrase] = useState('')
  const [loading, setLoading] = useState(true)
  const [invalidWord, setInvalidWord] = useState(null)
  const [popupKey, setPopupKey] = useState(0)
  const [cursorPos, setCursorPos] = useState(null)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [puzzleId, setPuzzleId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [showExpiry, setShowExpiry] = useState(false)

  const words = phrase ? phrase.split(' ') : []
  const phraseLetters = phrase ? phrase.replace(/ /g, '') : ''
  const totalLetters = phraseLetters.length
  const maxGuesses = 6

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const resetHour = 5
      const reset = new Date()
      reset.setUTCHours(resetHour, 0, 0, 0)
      if (reset <= now) return
      const minsLeft = (reset - now) / 60000
      if (minsLeft <= 5 && minsLeft > 2) setShowExpiry(true)
    }
    const interval = setInterval(check, 10000)
    return () => clearInterval(interval)
  }, [])

  const evaluateGuess = useCallback((guessStr) => {
    const result = []
    const targetChars = phraseLetters.split('')
    const guessChars = guessStr.split('')
    const targetUsed = new Array(targetChars.length).fill(false)
    const guessUsed = new Array(guessChars.length).fill(false)

    for (let i = 0; i < guessChars.length; i++) {
      if (guessChars[i] === targetChars[i]) {
        result[i] = 'correct'
        targetUsed[i] = true
        guessUsed[i] = true
      }
    }

    for (let i = 0; i < guessChars.length; i++) {
      if (guessUsed[i]) continue
      const targetIndex = targetChars.findIndex((char, idx) => char === guessChars[i] && !targetUsed[idx])
      if (targetIndex !== -1) {
        result[i] = 'present'
        targetUsed[targetIndex] = true
      } else {
        result[i] = 'absent'
      }
    }

    return result
  }, [phraseLetters])

  const rebuildStateFromGuesses = useCallback((savedGuesses) => {
    const rebuiltGuesses = []
    let rebuiltKeyboard = {}
    let rebuiltGameOver = false
    let rebuiltWon = false

    for (let i = 0; i < savedGuesses.length; i++) {
      const guessStr = savedGuesses[i].word
      const evaluation = evaluateGuess(guessStr)
      rebuiltGuesses.push({ word: guessStr, evaluation })

      for (let j = 0; j < guessStr.length; j++) {
        const letter = guessStr[j]
        const status = evaluation[j]
        const current = rebuiltKeyboard[letter]
        if (status === 'correct' || (status === 'present' && current !== 'correct') || (status === 'absent' && !current)) {
          rebuiltKeyboard[letter] = status
        }
      }

      const isWin = evaluation.every(s => s === 'correct')
      if (isWin) { rebuiltGameOver = true; rebuiltWon = true; break }
      if (i >= maxGuesses - 1) { rebuiltGameOver = true; rebuiltWon = false; break }
    }

    return { guesses: rebuiltGuesses, keyboardStatus: rebuiltKeyboard, gameOver: rebuiltGameOver, won: rebuiltWon }
  }, [evaluateGuess, maxGuesses])

  const saveProgress = useCallback(async (state, user, pid) => {
    const guessesPayload = state.guesses.map(g => ({ word: g.word }))
    if (user) {
      await supabase.from('game_progress').upsert({
        user_id: user.id, puzzle_id: pid, guesses: guessesPayload,
        current_guess: state.guess, cursor_pos: state.cursorPos, updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,puzzle_id' })
    } else {
      localStorage.setItem(getGuestStorageKey(pid), JSON.stringify({
        guesses: guessesPayload, guess: state.guess, cursorPos: state.cursorPos, savedAt: new Date().toISOString()
      }))
    }
  }, [])

  const clearProgress = useCallback(async (user, pid) => {
    if (user) {
      await supabase.from('game_progress').delete().eq('user_id', user.id).eq('puzzle_id', pid)
    } else {
      localStorage.removeItem(getGuestStorageKey(pid))
    }
  }, [])

  const applySavedGuesses = useCallback((savedGuesses, savedGuess, savedCursorPos) => {
    if (savedGuesses && Array.isArray(savedGuesses) && savedGuesses.length > 0) {
      const rebuilt = rebuildStateFromGuesses(savedGuesses)
      setGuesses(rebuilt.guesses)
      setKeyboardStatus(rebuilt.keyboardStatus)
      setGameOver(rebuilt.gameOver)
      setWon(rebuilt.won)
      setGuess(savedGuess || '')
      setCursorPos(savedCursorPos ?? null)
    }
  }, [rebuildStateFromGuesses])

  useEffect(() => {
    const fetchPuzzle = async () => {
      const now = new Date()
      const nyNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const nyHour = nyNow.getHours()
      const targetDate = nyHour < 12
        ? new Date(nyNow.getTime() - 86400000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
        : nyNow.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

      const { data: puzzleData, error: puzzleError } = await supabase
        .from('puzzles').select('phrase, puzzle_id').eq('puzzle_date', targetDate).single()

      if (puzzleError || !puzzleData) { setPhrase('ERROR HAS OCCURRED'); setLoading(false); return }

      const fetchedPhrase = puzzleData.phrase
      setPhrase(fetchedPhrase)
      setPuzzleId(puzzleData.puzzle_id)

      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user ?? null)

      if (user) {
        const { data: existing } = await supabase.from('submissions')
          .select('status, attempts, points_earned').eq('user_id', user.id)
          .eq('puzzle_id', puzzleData.puzzle_id).maybeSingle()

        if (existing) {
          setAlreadySubmitted(true)
          setSubmissionResult(existing)
          setGameOver(true)
          setWon(existing.status === 'completed')
          await supabase.from('game_progress').delete().eq('user_id', user.id).eq('puzzle_id', puzzleData.puzzle_id)
          setLoading(false)
          return
        }

        const guestSave = localStorage.getItem(getGuestStorageKey(puzzleData.puzzle_id))
        if (guestSave) {
          try {
            const parsed = JSON.parse(guestSave)
            if (parsed.guesses?.length > 0) {
              await supabase.from('game_progress').upsert({
                user_id: user.id, puzzle_id: puzzleData.puzzle_id, guesses: parsed.guesses,
                current_guess: parsed.guess || '', cursor_pos: parsed.cursorPos ?? null, updated_at: new Date().toISOString()
              }, { onConflict: 'user_id,puzzle_id' })
            }
          } catch (e) {}
          localStorage.removeItem(getGuestStorageKey(puzzleData.puzzle_id))
        }

        const { data: progress } = await supabase.from('game_progress')
          .select('guesses, current_guess, cursor_pos').eq('user_id', user.id)
          .eq('puzzle_id', puzzleData.puzzle_id).maybeSingle()

        if (progress?.guesses?.length > 0) {
          applySavedGuesses(progress.guesses, progress.current_guess, progress.cursor_pos, fetchedPhrase)
        }
      } else {
        const saved = localStorage.getItem(getGuestStorageKey(puzzleData.puzzle_id))
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            applySavedGuesses(parsed.guesses, parsed.guess, parsed.cursorPos, fetchedPhrase)
          } catch (e) {
            localStorage.removeItem(getGuestStorageKey(puzzleData.puzzle_id))
          }
        }
      }

      setLoading(false)
    }

    fetchPuzzle()
  }, [applySavedGuesses])

  const submitWin = async (attemptsCount) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('No user logged in')
        return
      }
      const now = new Date()
      const nyNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const nyHour = nyNow.getHours()
      const targetDate = nyHour < 12
        ? new Date(nyNow.getTime() - 86400000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
        : nyNow.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
      const { data: puzzle, error: puzzleError } = await supabase
        .from('puzzles')
        .select('puzzle_id')
        .eq('puzzle_date', targetDate)
        .single()
      if (puzzleError || !puzzle) {
        console.error('Puzzle lookup failed:', puzzleError)
        return
      }
      const { data: existing, error: existingError } = await supabase
        .from('submissions')
        .select('id')
        .eq('user_id', user.id)
        .eq('puzzle_id', puzzle.puzzle_id)
        .maybeSingle()
      if (existingError) {
        console.error('Existing check failed:', existingError)
        return
      }
      if (existing) {
        console.log('Already submitted')
        return
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('current_streak, last_completed_date')
        .eq('id', user.id)
        .single()
      if (userError) {
        console.error('User data fetch failed:', userError)
        return
      }
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
      const streakContinues = userData?.last_completed_date === yesterdayStr
      const newStreak = streakContinues ? (userData?.current_streak || 0) + 1 : 1
      const streakBonus = newStreak * 2.5
      const { error: insertError } = await supabase.from('submissions').insert({
        user_id: user.id,
        puzzle_id: puzzle.puzzle_id,
        attempts: attemptsCount,
        points_earned: 50,
        is_current_day: true,
        completed_at: new Date().toISOString(),
        streak_bonus: streakBonus,
        puzzle_date: targetDate,
        status: 'completed'
      })
      if (insertError) {
        console.error('Submission insert failed:', insertError)
      } else {
        console.log('Submission created successfully')
        await clearProgress(user, puzzle.puzzle_id)
      }
    } catch (err) {
      console.error('submitWin crashed:', err)
    }
  }

  const checkWord = useCallback(async (word) => {
    try {
      const res = await fetch(`https://api.datamuse.com/words?sp=${word.toLowerCase()}&md=f&max=1`)
      const data = await res.json()
      if (data.length === 0) return false
      if (data[0].word.toLowerCase() !== word.toLowerCase()) return false
      const freq = data[0].tags?.find(t => t.startsWith('f:'))
      if (!freq) return false
      return parseFloat(freq.split(':')[1]) > 0.5
    } catch (e) {
      return true
    }
  }, [])

  const validateWords = useCallback(async (guessStr) => {
    if (!phrase) return null
    const phraseWordLengths = phrase.split(' ').map(w => w.length)
    let idx = 0
    const guessWordsList = []
    for (const len of phraseWordLengths) {
      guessWordsList.push(guessStr.slice(idx, idx + len))
      idx += len
    }
    for (const word of guessWordsList) {
      const isValid = await checkWord(word)
      if (!isValid) return word
    }
    return null
  }, [phrase, checkWord])

  const updateKeyboardStatus = useCallback((guessStr, evaluation) => {
    setKeyboardStatus(prev => {
      const next = { ...prev }
      for (let i = 0; i < guessStr.length; i++) {
        const letter = guessStr[i]
        const status = evaluation[i]
        const current = next[letter]
        if (status === 'correct' || (status === 'present' && current !== 'correct') || (status === 'absent' && !current)) {
          next[letter] = status
        }
      }
      return next
    })
  }, [])

  const handleKeyPress = useCallback((key) => {
    if (gameOver || showHelp || loading || alreadySubmitted) return
    const pos = cursorPos ?? 0
    setGuess(prev => {
      const arr = prev.padEnd(totalLetters, ' ').split('')
      arr[pos] = key
      return arr.join('').trimEnd()
    })
    setCursorPos(Math.min(pos + 1, totalLetters - 1))
  }, [cursorPos, totalLetters, gameOver, showHelp, loading, alreadySubmitted])

  const handleEnter = useCallback(async () => {
    if (gameOver || showHelp || loading || alreadySubmitted) return
    const cleanGuess = guess.replace(/ /g, '')
    if (cleanGuess.length === totalLetters) {
      const invalid = await validateWords(cleanGuess)
      if (invalid) {
        setInvalidWord(null)
        setTimeout(() => { setInvalidWord(invalid); setPopupKey(prev => prev + 1) }, 0)
        return
      }

      const evaluation = evaluateGuess(cleanGuess)
      updateKeyboardStatus(cleanGuess, evaluation)
      const newGuesses = [...guesses, { word: cleanGuess, evaluation }]
      setGuesses(newGuesses)
      setGuess('')
      setCursorPos(null)

      const isWin = evaluation.every(s => s === 'correct')
      if (isWin) {
        setWon(true)
        setGameOver(true)
        submitWin(newGuesses.length)
      } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true)
        await clearProgress(currentUser, puzzleId)
      } else {
        await saveProgress({ guesses: newGuesses, guess: '', cursorPos: null }, currentUser, puzzleId)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess, guesses, gameOver, showHelp, loading, alreadySubmitted, evaluateGuess, updateKeyboardStatus, totalLetters, maxGuesses, saveProgress, clearProgress, currentUser, puzzleId])

  const handleDelete = useCallback(() => {
    if (gameOver || showHelp || loading || alreadySubmitted) return
    const pos = cursorPos ?? Math.max(guess.length - 1, 0)
    setGuess(prev => {
      const arr = prev.padEnd(totalLetters, ' ').split('')
      if (!arr[pos] || arr[pos] === ' ') {
        const target = Math.max(pos - 1, 0)
        arr[target] = ' '
        setCursorPos(target)
      } else {
        arr[pos] = ' '
      }
      return arr.join('').trimEnd()
    })
  }, [cursorPos, guess.length, totalLetters, gameOver, showHelp, loading, alreadySubmitted])

  const handleCellClick = useCallback((index) => {
    if (gameOver || loading || alreadySubmitted) return
    setCursorPos(index)
  }, [gameOver, loading, alreadySubmitted])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showHelp || loading || alreadySubmitted) return
      const key = e.key.toUpperCase()
      if (key === 'ENTER') handleEnter()
      else if (key === 'BACKSPACE') handleDelete()
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key)
      else if (e.key === 'ArrowLeft') setCursorPos(prev => Math.max((prev ?? 0) - 1, 0))
      else if (e.key === 'ArrowRight') setCursorPos(prev => Math.min((prev ?? 0) + 1, totalLetters - 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress, handleEnter, handleDelete, showHelp, loading, alreadySubmitted, totalLetters])

  if (loading) {
    return (
      <div className="game" style={{ justifyContent: 'center' }}>
        <span style={{ fontFamily: '"BM HANNA Air OTF", sans-serif', fontSize: '24px' }}>Loading...</span>
      </div>
    )
  }

  return (
    <>
      <FallingFlowers enabled={true} />
      <div className="game">
        {showExpiry && <PuzzleExpiryPopup onClose={() => setShowExpiry(false)} />}
        {invalidWord && <WordErrorPopup key={popupKey} word={invalidWord} onClose={() => setInvalidWord(null)} />}

        {alreadySubmitted ? (
          <div className="answer-tiles">
            <Grid
              phrase={phrase}
              words={words}
              currentGuess={''}
              guesses={[{ word: phrase.replace(/ /g, ''), evaluation: Array(phrase.replace(/ /g, '').length).fill('correct') }]}
              maxGuesses={1}
              gameOver={true}
              won={true}
              cursorPos={null}
              onCellClick={() => {}}
            />
          </div>
        ) : (
          <div className="game-grid-area">
            <div className="grid-wrapper">
              <Grid
                phrase={phrase}
                words={words}
                currentGuess={guess}
                guesses={guesses}
                maxGuesses={maxGuesses}
                gameOver={gameOver}
                won={won}
                cursorPos={cursorPos}
                onCellClick={handleCellClick}
              />
            </div>
          </div>
        )}

        {alreadySubmitted && submissionResult && (
          <div className="already-submitted">
            {submissionResult.status === 'completed' ? (
              <div className="win-text-wrapper">
                <span className="win-text">YOU WON</span>
                <span className="win-subtext">ATTEMPTS: {submissionResult.attempts}</span>
                <span className="win-subtext">POINTS: {submissionResult.points_earned}</span>
              </div>
            ) : (
              <div className="game-over">
                <p className="lose-message">You already played today</p>
              </div>
            )}
          </div>
        )}

        {!alreadySubmitted && won && (
          <div className="win-text-wrapper">
            <span className="win-text">YOU WON</span>
            <span className="win-subtext">ATTEMPTS: {guesses.length}</span>
          </div>
        )}

        {!alreadySubmitted && gameOver && !won && (
          <div className="game-over">
            <p className="lose-message">
              The phrase was:{' '}
              <span style={{ fontFamily: "Griffy", color: 'darkred', fontWeight: 'bolder', letterSpacing: '1px' }}>
                {phrase}
              </span>
            </p>
          </div>
        )}

        {!alreadySubmitted && (
          <div className="keyboard-anchor">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={handleEnter}
              onDelete={handleDelete}
              keyboardStatus={keyboardStatus}
              disabled={gameOver || loading}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Game