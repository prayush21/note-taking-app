import React, { useMemo, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import NoteCard, { SimplifiedNote } from "./NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  tags: Tag[];
  showModal: boolean;
  handleClose: () => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const filteredNotes = useMemo(() => {
    return (notes || []).filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length == 0 ||
          selectedTags.every((selectedTag) => {
            return note.tags.some((tag) => tag.id === selectedTag.id);
          }))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row>
        <Col>
          {" "}
          <h1>Notes</h1>{" "}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Form.Group>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  isMulti
                  options={(availableTags || []).map(({ label, id }) => {
                    return { label: label, value: id };
                  })}
                  value={selectedTags.map((selectedTag) => {
                    return { label: selectedTag.label, value: selectedTag.id };
                  })}
                  onChange={(tags) =>
                    setSelectedTags(
                      tags.map((tag: any) => {
                        return { label: tag?.label, id: tag?.value };
                      })
                    )
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        tags={availableTags}
        showModal={showModal}
        handleClose={handleClose}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  );
};

function EditTagsModal({
  tags,
  showModal,
  handleClose,
  deleteTag,
  updateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <ModalHeader>Edit Tags</ModalHeader>
      <ModalBody>
        <Form>
          <Stack gap={1}>
            {(tags || []).map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NoteList;
