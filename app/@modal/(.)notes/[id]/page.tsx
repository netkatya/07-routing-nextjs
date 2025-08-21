import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: { id: string };
};

const NotePreviewServer = async ({ params }: Props) => {
  const note = await fetchNoteById(params.id);

  return <NotePreviewClient note={note} />;
};

export default NotePreviewServer;
