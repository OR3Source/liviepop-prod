import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('id, username, display_name, total_points, current_streak, longest_streak');
      
      if (error) {
        setError(error);
      } else {
        setUsers(data || []);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return { data: users, isLoading, error };
};