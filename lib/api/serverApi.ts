import { Note } from '@/types/note';
import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { UpdateRequest } from './clientApi';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export type ServerResponse = {
  success: boolean;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<ServerResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNotes = async ({
  search,
  page = 1,
  tag,
}: FetchNotesParams) => {
  const cookieStore = await cookies();
  const params: FetchNotesParams = {
    page,
    perPage: 12,
  };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const updateServerMe = async (data: UpdateRequest): Promise<User> => {
  const cookieStore = await cookies();
  const res = await nextServer.patch<User>('/users/me', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};