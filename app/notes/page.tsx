import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const initialPage = 1;
  const initialSearch = '';
  const data = await fetchNotes(initialSearch, initialPage)

  return (
    <NotesClient 
    initialData={data}
    initialPage={initialPage}
    initialSearch={initialSearch}
    />
  );
};
