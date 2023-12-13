import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import noposter from '../images/no-poster.png'

function MovieCard({title, year, img, setMovieID}) {
    const [poster, setPoster] = useState('')

  function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }

  useEffect(() => {
    checkIfImageExists(img, (exists) => {
        if (exists) {
          // Success code
          setPoster(img)
        } else {
          // Fail code
          setPoster(noposter)
        }
      });
  })

  return (
    <Card className="search-card" onClick={() => setMovieID(title)}>
        <div className="movie-poster-container">
            <img src={poster} />
        </div>
        <div className="movie-desc">
            <p><span><b>{title}</b><br />{year}</span></p>
        </div>
    </Card>
  );
}

export default MovieCard;