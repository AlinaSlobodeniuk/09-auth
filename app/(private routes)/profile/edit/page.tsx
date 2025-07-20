'use client';

import { checkSession, getMe, updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (user?.username) {
      setNewUsername(user.username);
      return;
    }
    const fetchUser = async () => {
      try {
        await checkSession();
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUser(fetchedUser);
          setNewUsername(fetchedUser.username || '');
        }
      } catch {
        clearIsAuthenticated();
        router.push('/sign-in');
      }
    };
    fetchUser();
  }, [user, setUser, clearIsAuthenticated, router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({ username: newUsername });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    router.push('/profile');
  };
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form onSubmit={handleSaveUser} className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className={css.input}
                value={newUsername}
                onChange={handleChange}
                required
              />
            </div>

            <p>Email: {user.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
