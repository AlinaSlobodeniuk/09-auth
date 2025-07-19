import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile - NoteHub',
  description: 'Profile on NoteHub.',
  openGraph: {
    title: 'Profile - NoteHub',
    description: 'Profile on NoteHub.',
    url: `https://http://localhost:3000/Profile`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Account.',
      },
    ],
  },
};

export default async function Profile() {
  const data = await getServerMe();
  return (
    <>
      {data && (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <div className={css.header}>
              <h1 className={css.formTitle}>Profile Page</h1>
              <Link href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
              </Link>
            </div>
            <div className={css.avatarWrapper}>
              <Image
                src={data.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            </div>
            <div className={css.profileInfo}>
              <p>Username: {data.username}</p>
              <p>Email: {data.email}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
