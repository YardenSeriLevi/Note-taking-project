import React, { useEffect, useState } from 'react';
import { firestore, collection, query, onSnapshot, deleteDoc, doc } from './firebase';
import { Button, Card } from 'react-bootstrap';
import VersionHistory from './VersionHistory';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    const q = query(collection(firestore, 'notes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'notes', id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return (
    <div className="mt-5">
      <h3>Notes</h3>
      {notes.map((note) => (
        <Card key={note.id} className="mb-3">
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.content}</Card.Text>
            <Button variant="danger" onClick={() => handleDelete(note.id)}>
              Delete
            </Button>
            <Button variant="info" onClick={() => setSelectedNoteId(note.id)}>
              View Versions
            </Button>
          </Card.Body>
          {selectedNoteId === note.id && <VersionHistory noteId={note.id} />}
        </Card>
      ))}
    </div>
  );
};

export default NoteList;
