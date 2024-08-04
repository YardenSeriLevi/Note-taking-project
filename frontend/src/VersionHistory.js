import React, { useEffect, useState } from 'react';
import { firestore, collection, query, onSnapshot } from './firebase';
import { Card, ListGroup } from 'react-bootstrap';

const VersionHistory = ({ noteId }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (!noteId) return;

    const q = query(collection(firestore, 'notes', noteId, 'versions'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const versionsArray = [];
      querySnapshot.forEach((doc) => {
        versionsArray.push({ id: doc.id, ...doc.data() });
      });
      setVersions(versionsArray);
    });

    return () => unsubscribe();
  }, [noteId]);

  return (
    <div className="mt-5">
      <h3>Version History</h3>
      <ListGroup>
        {versions.map((version) => (
          <ListGroup.Item key={version.id}>
            <Card>
              <Card.Body>
                <Card.Title>{version.title}</Card.Title>
                <Card.Text>{version.content}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">
                    {new Date(version.createdAt.seconds * 1000).toLocaleString()}
                  </small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default VersionHistory;
