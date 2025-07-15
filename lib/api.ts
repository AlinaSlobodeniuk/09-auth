import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  throw new Error('Environment variable NEXT_PUBLIC_NOTEHUB_TOKEN is missing.');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type CreateNoteTodo = {
  title: string;
  content: string;
  tag: Note['tag'];
};

export const fetchNotes = async (search: string, page: number, perPage: number = 12): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = {
    page,
    perPage,
    search: search || undefined,
  };
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/notes', { params });

  const notes = response.data.notes ?? [];
  const totalPages = response.data.totalPages ?? 1;
  return {
    notes,
    totalPages: totalPages > 0 ? totalPages : 1,
  };
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: CreateNoteTodo): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('/notes', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};