import { FetchNotesParams, FetchNotesResponse } from './serverApi';
import { NewNoteData, Note } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export interface UpdateRequest {
  userName: string;
}

export const fetchNotes = async ({
  search,
  page = 1,
  tag,
}: FetchNotesParams) => {
  const params: FetchNotesParams = {
    page,
    perPage: 12,
  };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const checkSession = async () => {
  await nextServer.get('/auth/session');

};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const updateMe = async (data: UpdateRequest): Promise<User> => {
  const res = await nextServer.patch('/users/me', data);
  return res.data;
};
