import { useEffect, useState } from "react";

const NotesGet = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setEditingNote(note._id);
    setEditedTitle(note.title);
    setEditedContent(note.notes);
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle, notes: editedContent }),
      });
      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );

      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="notes grid grid-cols-3 gap-6">
      <h1 className="col-span-full text-3xl font-bold text-center mb-6 text-gray-800">
        Your Notes
      </h1>
      {notes.map((note) => (
        <div
          className="note-card flex flex-col justify-between w-full max-w-[300px] h-auto mx-auto p-6 bg-yellow-100 shadow-md rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          key={note._id}
        >
          {editingNote === note._id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl text-red-500 font-bold mb-2 w-full"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="text-gray-700 text-base leading-relaxed w-full"
              ></textarea>
              <button
                onClick={() => saveEdit(note._id)}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl text-red-500 font-bold mb-2">
                {note.title}
              </h1>
              <p className="text-gray-700 text-base leading-relaxed">
                {note.notes}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesGet;
