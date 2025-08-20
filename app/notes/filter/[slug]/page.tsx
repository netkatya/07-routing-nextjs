import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string }>; // зверни увагу — масив рядків
};

export default async function NotesPage({ params }: Props) {
  console.log("page params:", params);
  const resolvedParams = await params;
  const slugTag = resolvedParams.slug; // беремо перший сегмент URL

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
