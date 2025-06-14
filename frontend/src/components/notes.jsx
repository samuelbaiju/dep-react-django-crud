import React from "react";


function Notes({ notes, onDelete }) {
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="note-date">{formattedDate}</p>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Notes;