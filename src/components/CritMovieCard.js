import { useState, useEffect } from 'react';
import noposter from '../images/no-poster.png'
import { Container, Row, Col } from 'react-bootstrap'

function CritMovieCard({ critMovie }) {
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
    checkIfImageExists(critMovie.Poster, (exists) => {
      if (exists) {
        setPoster(critMovie.Poster)
      } else {
        setPoster(noposter)
      }
    });
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={6} sm={6} md={4}>
            <img 
              src={poster} 
              style={{maxWidth: '240px', maxHeight: '360px'}} 
            />
        </Col>
        <Col xs={6} sm={6} md={8}>
          <div className="movie-full-description">
            <h3>{critMovie.Title}</h3>

            <p><i>{critMovie.Rated} | {critMovie.Year} <br />{critMovie.Genre}</i></p>

            <h4>Director</h4>
            <p>{critMovie.Director}</p>

            <h4>Actors/Actresses</h4>
            <p>{critMovie.Actors}</p>

            <h4>Awards</h4>
            <p>{critMovie.Awards}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CritMovieCard;