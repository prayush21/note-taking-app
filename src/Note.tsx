import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Stack,
} from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Note } from "./App";

type NoteComponentProps = {
  onDelete: (id: string) => void;
};

export function NoteComponent({ onDelete }: NoteComponentProps) {
  const note = useOutletContext<Note>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => setShowModal(false);

  const handleDelete = () => {
    onDelete(note.id);
    setShowModal(false);
    navigate("..");
  };

  console.log("note", note);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => setShowModal(true)}>
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
      <Modal show={showModal} onHide={handleClose}>
        <ModalBody>Are you sure to delete this note?</ModalBody>
        <Stack
          direction="horizontal"
          gap={1}
          className="mb-2 justify-content-end"
        >
          <Button variant="danger" onClick={handleDelete}>
            Delete it
          </Button>
          <Button variant="primary" className="mx-2" onClick={handleClose}>
            Keep it
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
