function ComicPreview({ comic }) {
  if (!comic || typeof comic.panels !== "number") return null;

  return (
    <div className="preview">
      <h2>Your Comic</h2>

      <div className="panel-container">
        {[...Array(comic.panels)].map((_, index) => (
          <div key={index} className="panel"></div>
        ))}
      </div>
    </div>
  );
}

export default ComicPreview;
