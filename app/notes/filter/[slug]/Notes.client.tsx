"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/app/loading";

import css from "./Notes.page.module.css";
import { useSearchParams } from "next/navigation";

export default function NotesClient() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, 12, tag),
    placeholderData: (prev) => prev,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isFetching && <Loader />}
      {isError && <p>Error: {(error as Error).message}</p>}
      {data && data.notes.length === 0 && !isFetching && (
        <p className={css.notfound}>
          {debouncedSearch
            ? `No notes found for "${debouncedSearch}"`
            : "No notes found"}
        </p>
      )}
      {data && data.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
