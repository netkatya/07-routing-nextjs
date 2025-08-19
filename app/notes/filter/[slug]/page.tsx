import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <NotesClient />
      <h1>Docs page</h1>
      <p>Current path: {slug?.join(" / ") || "home"}</p>
    </div>
  );
}
