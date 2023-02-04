import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "./App";
import { NewNoteProps } from "./NewNote";
import { NoteForm } from "./NoteForm";

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useOutletContext<Note>();
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
      />
    </>
  );
}
