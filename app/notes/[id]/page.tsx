import { fetchNoteById } from "@/lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NotePageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NoteDetailsClient noteId={id} dehydratedState={dehydrate(queryClient)} />
  );
};

export default NoteDetails;
