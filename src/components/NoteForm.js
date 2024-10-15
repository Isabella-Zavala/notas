// src/components/NoteForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NoteForm = ({ addNote }) => {
  const [note, setNote] = useState({
    id: '',
    text: '',
    color: '#ffffff',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.text.trim() === '') return;
    addNote({ ...note, id: uuidv4() });
    setNote({
      id: '',
      text: '',
      color: '#ffffff',
      tags: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        value={note.text}
        onChange={handleChange}
        placeholder="Escribe una nota..."
      />
      <input
        type="color"
        name="color"
        value={note.color}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tags"
        value={note.tags}
        onChange={handleChange}
        placeholder="Etiquetas separadas por comas"
      />
      <button type="submit">Añadir Nota</button>
    </form>
  );
};

export default NoteForm;
