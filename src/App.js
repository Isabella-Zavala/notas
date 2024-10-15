// src/App.js
import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, content: "Nota 1", color: "#fff6ba", category: "" },
    { id: 2, content: "Nota 2", color: "#b0e57c", category: "" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("#fff6ba");
  const [newNoteCategory, setNewNoteCategory] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const addOrUpdateNote = () => {
    if (newNoteContent.trim() !== "") {
      if (editNoteId) {
        // Si estamos editando, actualizamos la nota
        setNotes(notes.map(note => 
          note.id === editNoteId ? { ...note, content: newNoteContent, color: newNoteColor, category: newNoteCategory } : note
        ));
        setEditNoteId(null); // Limpiar el ID de edición
      } else {
        // Si estamos añadiendo, creamos una nueva nota
        const newNote = {
          id: notes.length + 1,
          content: newNoteContent,
          color: newNoteColor,
          category: newNoteCategory,
        };
        setNotes([...notes, newNote]);
      }
      setNewNoteContent(""); // Limpiar el campo de texto
      setNewNoteCategory(""); // Limpiar el campo de categoría
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (note) => {
    setEditNoteId(note.id); // Guardar el ID de la nota a editar
    setNewNoteContent(note.content); // Cargar el contenido de la nota
    setNewNoteColor(note.color); // Cargar el color de la nota
    setNewNoteCategory(note.category); // Cargar la categoría de la nota
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tablero de Notas</h1>
  
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            className="input-box"
            type="text"
            placeholder="Buscar..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button className="search-icon">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/search.png" alt="Buscar" />
          </button>
        </div>
  
        {/* Cuadro para ingresar nueva nota */}
        <textarea
          className="input-box"
          value={newNoteContent} 
          onChange={(e) => setNewNoteContent(e.target.value)} 
          placeholder="Escribe una nueva nota..." 
        />
  
        {/* Campo para ingresar categoría */}
        <input
          className="input-box"
          type="text"
          value={newNoteCategory} 
          onChange={(e) => setNewNoteCategory(e.target.value)} 
          placeholder="Etiqueta/Categoría..." 
        />
  
        {/* Selector de color para la nota */}
        <div>
          <label>Color de la nota:</label>
          <input
            type="color"
            value={newNoteColor} 
            onChange={(e) => setNewNoteColor(e.target.value)} 
          />
        </div>
  
        {/* Botón para agregar o actualizar la nota */}
        <button onClick={addOrUpdateNote}>
          {editNoteId ? "Actualizar Nota" : "Agregar Nota"}
        </button>
      </header>
  
      {/* Mostrar notas filtradas aquí */}
      <div className="board">
        {filteredNotes.map(note => (
          <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
            <p>{note.content}</p>
            {note.category && (
              <p style={{ fontSize: '1rem', color: '#585858', margin: 0 }}>
                <strong>Etiqueta:</strong> {note.category}
              </p>
            )}
            {/* Botones para eliminar y editar notas */}
            <button className="delete-icon" onClick={() => deleteNote(note.id)}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/trash.png" alt="Eliminar" />
            </button>
            <button className="edit-icon" onClick={() => startEditing(note)}>
              ✎
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;





