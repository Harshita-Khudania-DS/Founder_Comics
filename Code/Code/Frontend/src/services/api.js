export async function generateComic(joke) {
  const response = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ joke }),
  });

  return response.json();
}
