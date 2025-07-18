import axios, { AxiosResponse } from 'axios';
import { NewNoteData, Note } from '../types/note';

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
  tag?: string;
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
  const response = await axiosInstance.get('/notes', { params });

  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: NewNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post(
    '/notes',
    newNote
  );
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(
    `/notes/${id}`
  );
  return response.data;
};
