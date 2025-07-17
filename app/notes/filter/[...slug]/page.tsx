import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  return {
    title: `Notes${tag ? ` - ${tag}` : "All Notes"}`,
    description: `Notes filtered by ${tag || "All Notes"}`,
    openGraph: {
      title: `Notes${tag ? ` - ${tag}` : "All Notes"}`,
      description: `Notes filtered by ${tag || "All Notes"}`,
      url: `https://08-zustand-wine.vercel.app/notes/filter/${slug.join("/")}`,
     
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes${tag ? ` - ${tag}` : "All Notes"}`,
        },
      ],
      
    },
   
  }
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes({ tag, page: 1 });
  return <NotesClient initialData={initialData} tag={tag} />;
}
