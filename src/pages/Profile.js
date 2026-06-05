import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, Flame } from 'lucide-react';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, userData, signOut, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('total_points, current_streak')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setStats(data);
      }
      setStatsLoading(false);
    };

    fetchStats();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || statsLoading) {
    return (
      <div className="profile-page" style={{ justifyContent: 'center' }}>
        <span style={{ fontFamily: '"BM HANNA Air OTF", sans-serif', fontSize: '24px' }}>
          Loading...
        </span>
      </div>
    );
  }

  const memberSince = userData?.created_at
    ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">
          Hello, <span style={{ color: '#A92E43' }}>{userData?.username || 'livie'}</span>
        </h1>
      </div>

      <div className="profile-card">
        <div className="profile-card-inner">

          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">Username</span>
              <span className="profile-value">{userData?.username || '—'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user?.email || '—'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Member Since</span>
              <span className="profile-value">{memberSince}</span>
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-box">
              <span className="profile-stat-label">Total Points</span>
              <span className="profile-stat-value points">
                {(stats?.total_points ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="profile-stat-box">
              <span className="profile-stat-label">Current Streak</span>
              <span className="profile-stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {stats?.current_streak || '0'}
                <Flame size={20} color="#A92E43" fill='#A92E43'/>
              </span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            SIGN OUT
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;