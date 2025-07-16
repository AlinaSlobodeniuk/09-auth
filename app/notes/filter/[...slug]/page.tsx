import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes({ tag, page: 1 });
  return <NotesClient initialData={initialData} tag={tag} />;
}
