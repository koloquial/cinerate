import { useState, useEffect } from 'react';
import noposter from '../images/no-poster.png'
import { Container, Row, Col } from 'react-bootstrap'

function MovieCardResult({ critMovie }) {
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

            <h1>{critMovie.imdbRating}</h1>
            <p>{critMovie.imdbVotes} Votes</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieCardResult;