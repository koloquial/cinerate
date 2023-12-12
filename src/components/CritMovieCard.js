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
            <p className='centered small'><i> {critMovie.Genre}</i></p>
        </Col>
        <Col xs={6} sm={6} md={8}>
          <div className="movie-full-description">
            <p className='key-val'>Director</p>
            <p>{critMovie.Director}</p>

            <p className='key-val'>Cast</p>
            <p>{critMovie.Actors}</p>

            <p className='key-val'>Awards</p>
            <p>{critMovie.Awards}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CritMovieCard;