import { useEffect, useState } from 'react';
import api from '../api';
import Notes from '../components/notes';

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await api.get('/api/notes/');
            if (response.status === 200) {
                setNotes(response.data);
            } else {
                console.error('Failed to fetch notes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/notes/', { title, content });
            if (response.status === 201) {
                setNotes([...notes, response.data]);
                setTitle('');
                setContent('');
            } else {
                console.error('Failed to add note:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
        fetchNotes();
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            if (response.status === 204) {
                setNotes(notes.filter(note => note.id !== id));
            } else {
                console.error('Failed to delete note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
        fetchNotes();
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-inter p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-xl animate-fade-in-up">
                    Notes Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition-all shadow-md"
                >
                    Logout
                </button>
            </div>

            <p className="mb-6 text-lg text-slate-300 animate-fade-in">Create, view, and manage your notes efficiently.</p>

            {/* Notes Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="bg-white text-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <h2 className="text-xl font-bold text-indigo-700 mb-2">{note.title}</h2>
                        <p className="mb-4 text-sm text-gray-700">{note.content}</p>
                        <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Note Form */}
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-xl w-full max-w-2xl mx-auto animate-fade-in">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Add a New Note</h2>
                <form onSubmit={handleAddNote}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        required
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all font-semibold"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
// This component displays the home page with a header, a list of notes, and a form to add new notes.