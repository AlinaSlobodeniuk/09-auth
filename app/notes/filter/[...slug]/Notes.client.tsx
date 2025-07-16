'use client';

import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import Error from '@/components/Error/Error';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [isModal, setIsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const {
    data = { notes: [], totalPages: 0 },
    isLoading,
    isError,
    error,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({ search: debouncedSearch, page: page, tag: tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

    const handleCreateNote = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>

      {isModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      {isLoading && <Loader />}
      {isError && (
        <Error message={error?.message || 'An unknown error occurred'} />
      )}
      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}
    </div>
  );
}
