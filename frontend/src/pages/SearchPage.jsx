import { useState } from "react";
import axios from "axios";

function SearchPage() {
  const [cvs, setCvs] = useState([]);
  const [skills, setSkills] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/cvs?skills=${skills}`);
      setCvs(response.data);
    } catch (error) {
      console.error("Error searching CVs:", error);
    }
  };

  return (
    <div>
      <h1>CV Search</h1>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Enter skills"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {cvs.map((cv) => {
          console.log(cv.photo);
          return (
            <li key={cv.id}>
              <h2>{cv.name}</h2>
              <img
                src={`http://localhost:3000/${cv.photo}`}
                alt={cv.name}
                width={100}
                height={100}
              />
              <p>Education: {cv.education}</p>
              <p>Experience: {cv.experience}</p>
              <p>Skills: {cv.skills}</p>
              <p>Certifications: {cv.certifications}</p>
              <p>Projects: {cv.projects}</p>
              <p>Languages: {cv.languages}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchPage;
