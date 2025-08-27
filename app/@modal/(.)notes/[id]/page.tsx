import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import { Note } from "@/types/note";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const note: Note = await fetchNoteById(params.id);

  return <NotePreviewClient note={note} />;
};

export default Page;
