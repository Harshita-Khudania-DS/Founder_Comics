import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [jokes, setJokes] = useState([""]);
  const [panels, setPanels] = useState([]);

  // Add Joke Field
  const addJoke = () => {
    setJokes([...jokes, ""]);
  };

  // Remove Joke Field
  const removeJoke = (index) => {
    const updated = jokes.filter((_, i) => i !== index);
    setJokes(updated);
  };

  // Handle Input Change
  const handleChange = (index, value) => {
    const updated = [...jokes];
    updated[index] = value;
    setJokes(updated);
  };

  // Generate Comic
  const generateComic = () => {
    const validJokes = jokes.filter((joke) => joke.trim() !== "");

    if (validJokes.length === 0) {
      alert("Please enter at least one joke first.");
      return;
    }

    setPanels(validJokes);
  };

  // Reset to Create New Comic
  const resetComic = () => {
    setPanels([]);
    setJokes([""]);
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            Turn Your Jokes Into <span>Comics</span>
          </h1>
          <p>
            Write your jokes and instantly generate clean, beautiful comic
            panels in seconds.
          </p>
        </div>

        {/* INPUT CARD */}
        {panels.length === 0 && (
          <div className="card">
            {jokes.map((joke, index) => (
              <div key={index}>
                <textarea
                  placeholder={`Enter Joke ${index + 1}`}
                  value={joke}
                  onChange={(e) => handleChange(index, e.target.value)}
                />

                {jokes.length > 1 && (
                  <button
                    onClick={() => removeJoke(index)}
                    style={{
                      marginTop: "8px",
                      background: "#fee2e2",
                      color: "#991b1b",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button className="add-btn" onClick={addJoke}>
              + Add Another Joke
            </button>

            <button className="generate-btn" onClick={generateComic}>
              Generate Comic
            </button>
          </div>
        )}
      </div>

      {/* PREVIEW SECTION */}
      {panels.length > 0 && (
        <div className="preview">
          <h2>Your Comic Panels</h2>

          <div className="panel-container">
            {panels.map((panel, index) => (
              <div className="panel" key={index}>
                <p
                  style={{
                    padding: "20px",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  {panel}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button
              onClick={resetComic}
              className="generate-btn"
              style={{ padding: "1rem 2rem" }}
            >
              Create Another Comic
            </button>
          </div>
        </div>
      )}
    </>
  );
}
