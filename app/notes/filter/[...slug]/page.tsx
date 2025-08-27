import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const slugTags = params?.slug ?? [];

  const apiTags = slugTags.map(
    (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
  );

  const tag = apiTags[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
