import React, { useEffect, useState } from "react";
import axios from "axios";

function DetailsPage() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
const[lastOpenedNote,setLastOpenedNote]=useState(null)
  const toggleModal = (note) => {
    setLastOpenedNote(note)
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      
      <div className="container">
        <div>
          <h3>Fetch data from Api</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th>color</th>
                {/* <th>Image</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((note, index) => {
                return (
                  <tr key={index}>
                    <td>{note.id}</td>
                    <td>{note.title}</td>
                    <td>{note.description}</td>
                    <td>{note.color}</td>
                    {/* <td>{note.image}</td> */}
                    <td>
                      <button onClick={() => handleDelete(note.id)}>
                        Delete
                      </button>
                      <button onClick={()=>toggleModal(note)}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white w-1/2 rounded-lg z-50 overflow-y-auto">
            <div className="py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">{`${lastOpenedNote.title}`}</p>
                <button
                  onClick={toggleModal}
                  className="focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 text-black hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700">Modal content goes here.</p>
              <div className="mt-4">
                <button
                  onClick={toggleModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
