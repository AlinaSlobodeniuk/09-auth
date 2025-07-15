"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const noteId = +id;
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{note.createdAt}</p>
	</div>
</div>
  )
};
