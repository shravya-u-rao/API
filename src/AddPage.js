import React, { useState } from "react";
import axios from 'axios';
function AddPage() {
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[color,setColor]=useState("")

    function saveUser() {
      let data = { title, description, color };
    
      axios.post("http://localhost:8000/notes", data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
    }

  return (
    <div className="AddPage">
      <h1>Post API</h1>
      <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} name="title"></input><br/> <br/>
      <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} name="description"></input><br/> <br/>
      <input type="text" value={color} onChange={(e)=>{setColor(e.target.value)}} name="color"></input><br/> <br/>
      <button onClick={saveUser}>Save</button>
    </div>
  );
}

export default AddPage;
