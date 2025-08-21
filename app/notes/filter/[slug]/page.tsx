import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string }>;
};

export default async function NotesPage({ params }: Props) {
  console.log("page params:", params);
  const resolvedParams = await params;
  const slugTag = resolvedParams.slug;

  const tagMap: Record<string, string> = {
    work: "Work",
    personal: "Personal",
    meeting: "Meeting",
    shopping: "Shopping",
    todo: "Todo",
  };

  const tag = slugTag ? tagMap[slugTag.toLowerCase()] : undefined;

  return <NotesClient tag={tag} />;
}
