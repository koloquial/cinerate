import { useState, useEffect } from 'react';
import noposter from '../images/no-poster.png'
import { Container, Row, Col } from 'react-bootstrap'

function CritMovieCard({title, year, img, actors, awards, boxOffice, director, genre, plot, rated, rating, votes}) {
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
    <Container>
      <Row>
        <Col xs={6} sm={6} md={4}>
              <img src={poster} />
        </Col>
        <Col xs={6} sm={6} md={8}>
          <div className="movie-full-description">
            <h3>{title}</h3>

            <p><i>{rated} | {year} <br />{genre}</i></p>

            <h4>Director</h4>
            <p>{director}</p>

            <h4>Actors/Actresses</h4>
            <p>{actors}</p>

            <h4>Awards</h4>
            <p>{awards}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CritMovieCard;