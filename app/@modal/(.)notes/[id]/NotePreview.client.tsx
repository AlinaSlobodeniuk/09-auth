'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '../../../../components/Modal/Modal';
import css from './NotePreview.module.css';

type NoteDetailsPreviewProps = { id: string };

export default function NoteDetailsPreview({ id }: NoteDetailsPreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClose} className={css.backBtn}>
            Go Back
          </button>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note.updatedAt === note.createdAt
              ? `Created at: ${new Date(note.createdAt).toLocaleString(
                  'uk-UA'
                )}`
              : `Updated at: ${new Date(note.updatedAt).toLocaleString(
                  'uk-UA'
                )}`}
          </p>
        </div>
      </div>
    </Modal>
  );
}
