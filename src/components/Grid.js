import React, { useRef, useEffect } from 'react';
import './Grid.css';

const TEST_PHRASE = 'WHAT THE HELL WHOM THE BEARS LIKE TOO WHILE WHAT ARE SNAKE';

const TEST_GUESSES = [
  { word: 'WHATHTE', evaluation: ['correct','absent','absent','correct','absent','absent','absent'] },
  { word: 'HELLYWHO', evaluation: ['absent','absent','correct','correct','absent','correct','present','absent'] },
  { word: 'THEBEARS', evaluation: ['correct','absent','present','correct','present','absent','correct','present'] },
  { word: 'LIKETOO', evaluation: ['present','correct','present','absent','correct','correct','correct'] },
  { word: 'WHILEWHAT', evaluation: ['correct','absent','present','correct','absent','correct','absent','absent','correct'] },
  { word: 'ARESNAKE', evaluation: ['absent','correct','present','present','correct','absent','correct','present'] },
];

const Grid = ({ 
  phrase = TEST_PHRASE, 
  currentGuess = '', 
  guesses = TEST_GUESSES, 
  maxGuesses = 6,
  won = false,
  cursorPos = null,
  onCellClick
}) => {
  const gridRef = useRef(null);
  
  const cleanPhrase = phrase.trim().toUpperCase().replace(/\s+/g, ' ');
  const totalLetters = cleanPhrase.replace(/ /g, '').length;

  const getGroupedWords = (phraseWords) => {
    const groups = [];
    let i = 0;
    while (i < phraseWords.length) {
      const current = phraseWords[i];
      const next = phraseWords[i + 1];
      if (current.length <= 3 && next && next.length <= 3 && (current.length + next.length + 1) <= 8) {
        groups.push(`${current} ${next}`);
        i += 2;
      } else {
        groups.push(current);
        i += 1;
      }
    }
    return groups;
  };

  const words = getGroupedWords(cleanPhrase.split(' '));

  const renderWordGroup = (letters, evaluation, type, key, isActive = false) => {
    let globalIndex = 0;
    return (
      <div key={key} className={`grid-word-group grid-word-group--${type}`}>
        {words.map((word, wordIndex) => {
          const subWords = word.split(' ');
          return (
            <div key={wordIndex} className="grid-word">
              {subWords.map((subWord, subIndex) => (
                <React.Fragment key={subIndex}>
                  {Array.from({ length: subWord.length }).map((_, i) => {
                    const cellIndex = globalIndex;
                    const letter = letters[cellIndex] || '';
                    const status = evaluation[cellIndex] || null;
                    const isSelected = isActive && cursorPos !== null && cellIndex === cursorPos;
                    globalIndex++;
                    return (
                      <div
                        key={i}
                        className={[
                          'grid-cell',
                          letter && letter.trim() ? 'grid-cell--filled' : '',
                          status ? `grid-cell--${status}` : '',
                          isSelected ? 'grid-cell--selected' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={isActive ? () => onCellClick?.(cellIndex) : undefined}
                      >
                        <span className="grid-cell-letter">
                          {letter && letter.trim() ? letter : ''}
                        </span>
                      </div>
                    );
                  })}
                  {subIndex < subWords.length - 1 && (
                    <div className="grid-word-gap" />
                  )}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const mostRecentGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  const olderGuesses = guesses.length > 1 ? guesses.slice(0, -1) : [];

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTo({
        top: gridRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [guesses.length, currentGuess]);

  const paddedGuess = currentGuess.padEnd(totalLetters, ' ').split('');

  return (
    <div className="grid-wrapper">
      <div className="grid" ref={gridRef}>
        {/* Previous guesses — SMALL */}
        {olderGuesses.map((guess, i) => (
          renderWordGroup(
            guess.word.toUpperCase().replace(/\s/g, '').split(''),
            guess.evaluation || [],
            'submitted',
            `old-${i}`,
            false
          )
        ))}

        {/* Most recent guess — LARGE (only one) */}
        {mostRecentGuess && renderWordGroup(
          mostRecentGuess.word.toUpperCase().replace(/\s/g, '').split(''),
          mostRecentGuess.evaluation || [],
          'recent',
          'recent',
          false
        )}

        {/* Next/active guess — MEDIUM (only one) */}
        {guesses.length < maxGuesses && !won && renderWordGroup(
          paddedGuess,
          [],
          'active',
          'active',
          true
        )}
      </div>
    </div>
  );
};

export default Grid;