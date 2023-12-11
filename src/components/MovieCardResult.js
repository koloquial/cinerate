import { useState, useEffect } from 'react';
import noposter from '../images/no-poster.png'
import { Container, Row, Col } from 'react-bootstrap'

function MovieCardResult({ room }) {
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
    checkIfImageExists(room.critMovie.Poster, (exists) => {
      if (exists) {
        setPoster(room.critMovie.Poster)
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
            <h3>{room.critMovie.Title}</h3>
            <br />
            <h1>Rating: <span style={{color: 'gold'}}>{room.critMovie.imdbRating}</span></h1>
            <p>Votes: {room.critMovie.imdbVotes}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieCardResult;