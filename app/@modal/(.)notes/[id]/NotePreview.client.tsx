"use client";

import NoteModal from "@/components/NoteModal/NoteModal";
import css from "./NotePreview.module.css";

type Note = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
};

type Props = {
  note: Note;
};

const NotePreviewClient = ({ note }: Props) => {
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
