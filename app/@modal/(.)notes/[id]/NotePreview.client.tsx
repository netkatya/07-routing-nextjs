"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

type NotePreviewProps = {
  note: Note;
};

const NoteModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={close} className={css.backBtn}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const NotePreviewClient = ({ note }: NotePreviewProps) => {
  return (
    <NoteModal>
      <div className={css.item}>
        <h2 className={`${css.header} ${css.h2}`}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
        <p className={css.date}>
          Updated: {new Date(note.updatedAt).toLocaleDateString()}
        </p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </NoteModal>
  );
};

export default NotePreviewClient;
