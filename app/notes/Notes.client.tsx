"use client";

import { useState } from 'react';
import NoteList from '../../components/NoteList/NoteList';
import NoteModal from '../../components/NoteModal/NoteModal';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '../../lib/api';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({ initialData, initialPage, initialSearch }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 400);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
    initialData: debouncedSearch === initialSearch && page === initialPage ? initialData : undefined,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <Error message={error?.message || 'An unknown error occurred'} />}
      {data?.notes?.length ? <NoteList notes={data.notes} /> : null}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}