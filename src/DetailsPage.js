import React, { useEffect, useState } from "react";
import axios from "axios";

function DetailsPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
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
            </tr>
           </thead>
           <tbody>
            {
                data.map((user,index)=>{
                    return <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.title}</td>
                        <td>{user.description}</td>
                        <td>{user.color}</td>
                    </tr>
                })
            }
           </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailsPage;
