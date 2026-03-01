import type { User } from '@/types/user';
import { nextServer } from './api';
import type {
  NotesHttpResponse,
  FetchNotesParams,
  Note,
  NewNote,
} from '@/types/note';

type CheckSessionRequest = {
  success: boolean;
};

export type Request = {
  email: string;
  password: string;
};

const tags = ['all', 'Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];

export const register = async (data: Request) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: Request) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const fetchNotes = async (
  tag: string,
  query?: string,
  page?: number,
): Promise<NotesHttpResponse> => {
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
    },
    params,
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', newNote, {
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`notes/${id}`, {
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: Note['id']) => {
  const response = await nextServer.get<Note>(`notes/${id}`, {
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
