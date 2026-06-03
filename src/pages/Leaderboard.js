import React, { useState, useMemo } from 'react';
import './Leaderboard.css';
import { ListOrdered, Flame, Crown, Puzzle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useCountdown } from '../hooks/useCountdown';

const getRankIcon = (rank) => {
  if (rank === 1) return <Crown size={20} color="#FFD700" fill="#FFD700" />;
  if (rank === 2) return <Crown size={20} color="#C0C0C0" fill="#c0c0c0ab" />;
  if (rank === 3) return <Crown size={20} color="#CD7F32" fill="#cd8032ab" />;
  return <span className="rank-number">{rank}</span>;
};

function Leaderboard() {
  const [sortBy, setSortBy] = useState('points');
  const { user } = useAuth();
  const { data: users, isLoading, error } = useLeaderboard();
  const { h, m, s } = useCountdown();

  const sortedData = useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => {
      if (sortBy === 'points') {
        if (b.total_points !== a.total_points) return b.total_points - a.total_points;
        if (b.current_streak !== a.current_streak) return b.current_streak - a.current_streak;
        return b.longest_streak - a.longest_streak;
      } else {
        if (b.current_streak !== a.current_streak) return b.current_streak - a.current_streak;
        if (b.longest_streak !== a.longest_streak) return b.longest_streak - a.longest_streak;
        return b.total_points - a.total_points;
      }
    });
  }, [users, sortBy]);

  const rankedData = sortedData
    .map((u, idx) => ({
      rank: idx + 1,
      username: u.username,
      points: u.total_points ?? 0,
      streak: u.current_streak ?? 0,
    }))
    .slice(0, 23);

  const currentUsername = user?.user_metadata?.username;

  if (isLoading) return <div className="leaderboard-page">Loading...</div>;
  if (error) return <div className="leaderboard-page">Error loading leaderboard</div>;

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">
          <Puzzle size={28} color="#A92E43" fill="#A92E43" />
          Leaderboard
        </h1>
        <p className="leaderboard-countdown">
          Next puzzle in {h}h {m}m {s}s
        </p>
        <div className="leaderboard-tabs">
          <button
            className={`leaderboard-tab ${sortBy === 'points' ? 'active' : ''}`}
            onClick={() => setSortBy('points')}
          >
            <ListOrdered strokeWidth={2.25} />
            By Points
          </button>
          <button
            className={`leaderboard-tab ${sortBy === 'streak' ? 'active' : ''}`}
            onClick={() => setSortBy('streak')}
          >
            <Flame strokeWidth={2.75} />
            By Streak
          </button>
        </div>
      </div>

      <div className="leaderboard-card">
        <div className="leaderboard-row leaderboard-header-row">
          <span className="col-rank">Rank</span>
          <span className="col-user">Username</span>
          <span className="col-points">Points</span>
          <span className="col-streak">Streak</span>
        </div>

        {rankedData.map((u) => (
          <div
            key={u.username}
            className={`leaderboard-row ${currentUsername && currentUsername === u.username ? 'current-user' : ''}`}
          >
            <span className="col-rank rank-cell">
              {getRankIcon(u.rank)}
            </span>
            <span className="col-user">@{u.username.replace(/[<>]/g, '')}</span>
            <span className="col-points points-cell">
              {u.points.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="col-streak streak-cell">
              <Flame size={13} color="#A92E43" fill="#A92E43" />
              {u.streak}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;