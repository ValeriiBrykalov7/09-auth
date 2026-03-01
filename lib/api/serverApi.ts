import type { Note, NotesHttpResponse, FetchNotesParams } from '@/types/note';
const tags = ['all', 'Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];
import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const fetchNotes = async (
  tag: string,
  query?: string,
  page?: number,
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();

  if (!tags.includes(tag)) {
    throw new Error(`Invalid tag: ${tag}`);
  }

  const params: FetchNotesParams = {
    perPage: 12,
  };

  if (query) {
    params.search = query;
  }

  if (page) {
    params.page = page;
  }

  if (tag !== 'all') {
    params.tag = tag;
  }

  const response = await nextServer.get<NotesHttpResponse>('/notes', {
    headers: {
      accept: 'application/json',
      Cookie: cookieStore.toString(),
    },
    params,
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const fetchNoteById = async (id: Note['id']) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`notes/${id}`, {
    headers: {
      accept: 'application/json',
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
