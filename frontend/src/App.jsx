import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('books')) || [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({ title: '', author: '', year: '', category: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  // Nota: inicializamos `books` desde localStorage en useState para evitar
  // llamar a setState directamente dentro de un efecto (evita renders en cascada).

  // Guardar libros en localStorage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = form;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, form]);
    }
    setForm({ title: '', author: '', year: '', category: '' });
  };

  const handleEdit = (index) => {
    setForm(books[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <header>
        <h1>Sistema de Gestión de Libros</h1>
      </header>

      <section className="form-section">
        <h2>{editingIndex !== null ? 'Editar Libro' : 'Agregar Libro'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Año"
            value={form.year}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingIndex !== null ? 'Actualizar' : 'Agregar'}</button>
        </form>
      </section>

      <section className="list-section">
        <h2>Lista de Libros</h2>
        {books.length === 0 ? (
          <p>No hay libros agregados.</p>
        ) : (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <strong>{book.title}</strong> - {book.author} ({book.year}) [{book.category}]
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;