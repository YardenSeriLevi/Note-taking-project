import React, { useState } from 'react';
import { firestore, serverTimestamp, collection, addDoc, doc, setDoc } from './firebase';
import { Button, Form } from 'react-bootstrap';

const AddNote = ({ noteId, existingNote }) => {
  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [content, setContent] = useState(existingNote ? existingNote.content : '');
  const [category, setCategory] = useState(existingNote ? existingNote.category : 'General');

  const handleAddNote = async () => {
    try {
      if (noteId) {
        const noteDoc = doc(firestore, 'notes', noteId);
        await addDoc(collection(noteDoc, 'versions'), {
          title,
          content,
          category,
          createdAt: serverTimestamp(),
        });

        await setDoc(noteDoc, {
          title,
          content,
          category,
          createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(firestore, 'notes'), {
          title,
          content,
          category,
          createdAt: serverTimestamp(),
        });
      }

      setTitle('');
      setContent('');
      setCategory('General');
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  return (
    <div className="mt-5">
      <h3>{noteId ? 'Edit Note' : 'Add Note'}</h3>
      <Form>
        <Form.Group controlId="formNoteTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group controlId="formNoteContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
        </Form.Group>
        <Form.Group controlId="formNoteCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddNote}>
          {noteId ? 'Save Note' : 'Add Note'}
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
