import { useState } from "react";

const Notespost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNote = async () => {
   

    try {
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, notes: content }),
      });

      const newNote = await response.json();
      console.log("Note added:", newNote);

      setTitle("");
      setContent("");
      
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="notes-container flex justify-center items-center flex-col">
      <div className="heading">
        <h1 className="text-3xl font-bold">Notes</h1>
      </div>

      <div className="notes-box w-[600px] h-[400px] bg-gray-800 rounded-xl flex flex-col justify-center items-center">
        <label className="text-3xl font-bold mb-2 text-white">Title</label>
        <input
          type="text"
          className="w-[300px] h-[50px] rounded-2xl mb-4 px-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-2xl mb-2 text-white">Enter whats on your mind</label>
        <textarea
          className="w-[300px] h-[100px] rounded-2xl px-3 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={addNote}
          className="bg-green-400 w-[100px] h-[50px] mt-4 rounded-2xl text-white font-medium hover:bg-green-500  duration-300 trasform hover:scale-105"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Notespost;
