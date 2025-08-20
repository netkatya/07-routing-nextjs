"use client";

import css from "./NoteModal.module.css";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const NoteModal = ({ children }: Props) => {
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

export default NoteModal;
