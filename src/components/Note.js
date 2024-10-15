// src/components/Note.js
import React from 'react';

const Note = ({ note, deleteNote }) => {
  return (
    <div style={{ backgroundColor: note.color }} className="note">
      <p>{note.text}</p>
      <small>{note.tags}</small>
      <button onClick={() => deleteNote(note.id)}>Eliminar</button>
    </div>
  );
};

export default Note;
