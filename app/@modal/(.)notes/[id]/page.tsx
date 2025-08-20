import NoteModal from "@/components/NoteModal/NoteModal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <NoteModal>
      <div className={css.item}>
        <h2 className={`${css.header} ${css.h2}`}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        <p className={css.date}>{note.updatedAt}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </NoteModal>
  );
};

export default NotePreview;
