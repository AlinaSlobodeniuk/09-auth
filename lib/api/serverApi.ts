import { Note } from '@/types/note';
import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';

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