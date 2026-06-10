import { useState } from "react";

function JokeInput({ setComic }) {
  const [jokes, setJokes] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJokeChange = (index, value) => {
    const updatedJokes = [...jokes];
    updatedJokes[index] = value;
    setJokes(updatedJokes);
  };

  const addJoke = () => {
    setJokes([...jokes, ""]);
  };

  const removeJoke = (index) => {
    const updatedJokes = jokes.filter((_, i) => i !== index);
    setJokes(updatedJokes);
  };

  const handleGenerate = () => {
    const validJokes = jokes.filter((j) => j.trim() !== "");

    if (validJokes.length === 0) {
      setError("Please enter at least one joke.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setComic({
        panels: validJokes.length,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card">
      {jokes.map((joke, index) => (
        <div key={index} className="joke-block">
          <textarea
            placeholder={`Enter Joke ${index + 1}`}
            value={joke}
            onChange={(e) => handleJokeChange(index, e.target.value)}
          />

          {jokes.length > 1 && (
            <button
              className="remove-btn"
              onClick={() => removeJoke(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {error && <p className="error">{error}</p>}

      <button className="add-btn" onClick={addJoke}>
        + Add Another Joke
      </button>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Comic"}
      </button>
    </div>
  );
}

export default JokeInput;
