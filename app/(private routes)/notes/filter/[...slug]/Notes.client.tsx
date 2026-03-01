'use client';

import css from './NotesPage.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

type NotesClientProps = {
  category: string;
};

const NotesClient = ({ category }: NotesClientProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, category],
    queryFn: () => fetchNotes(category, debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const changeQuery = (query: string) => {
    setQuery(query);
    setCurrentPage(1);
  };

  return (
    <main>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChange={changeQuery} />

          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          <Link href={'/notes/action/create'} className={css.button}>
            Create note +
          </Link>
        </header>
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </main>
  );
};

export default NotesClient;
