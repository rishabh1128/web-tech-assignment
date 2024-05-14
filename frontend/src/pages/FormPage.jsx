import { useState } from "react";
import axios from "axios";

function FormPage() {
  // State variables for form fields
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [contact, setContact] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [projects, setProjects] = useState("");
  const [languages, setLanguages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("contact", contact);
    formData.append("education", education);
    formData.append("experience", experience);
    formData.append("skills", skills);
    formData.append("certifications", certifications);
    formData.append("projects", projects);
    formData.append("languages", languages);

    try {
      await axios.post("/api/cvs", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      alert("CV submitted successfully!");
      // Reset form fields after submission
      setName("");
      setPhoto("");
      setContact("");
      setEducation("");
      setExperience("");
      setSkills("");
      setCertifications("");
      setProjects("");
      setLanguages("");
    } catch (error) {
      console.error("Error submitting CV:", error);
      alert("Error submitting CV. Please try again later.");
    }
  };

  return (
    <div>
      <h1>CV Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            name="photo"
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Education:</label>
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Experience:</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Certifications:</label>
          <textarea
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Projects:</label>
          <textarea
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Languages:</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
