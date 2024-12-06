import axios from "axios";

const Notes_Url = "http://localhost:5000/notes";

export const GetAllNotes = async () => {
  return await axios.get(Notes_Url);
};

export const DeleteNote = async (id) => {
  return await axios.delete(`${Notes_Url}/${id}`);
};

export const UpdateNote = async (id, updatedData) => {
  return await axios.put(`${Notes_Url}/${id}`, updatedData);
};
