import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  //   title?: string;
  //   markdown?: string;
  //   tags?: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  //   console.log("sele", selectedTags);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  };

  // const handleChange = (e: ChangeEvent) => {
  //     const updatedTags = e.map(({label, value}) => {

  //     })
  //     setSelectedTags([...selectedTags])
  //     console.log('event', e);

  // }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={title} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                placeholder="Select or Create your own tags"
                aria-label="tags"
                isMulti
                onCreateOption={(label) => {
                  const newTag = { label, id: uuidV4() };
                  onAddTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
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
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            defaultValue={markdown}
            required
            as="textarea"
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
