import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  const fetchUserAvatar = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single()
      if (data && data.avatar_url) {
        setUserAvatar(`https://jzisiocwxfpncaxevpht.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}`)
      } else {
        setUserAvatar(null)
      }
    }
  }

  return (
    <UserContext.Provider value={{ userAvatar, setUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const Profile = () => {
  const { userAvatar } = useUser();

  return (
    <div>
      {userAvatar && <img src={userAvatar} alt="User Avatar" />}
      {/* rest of the profile component */}
    </div>
  );
};

export default Profile;

