import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import noposter from '../images/no-poster.png'

function MovieCardMin({img, title, rating, votes, guesses, players, winner}) {
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
    <>
      <Row>
        <Col xs={6} sm={6} md={4}>
              <img src={poster} />
        </Col>
        <Col xs={6} sm={6} md={8}>
            <h2>{title}</h2>
            <br />
            <h2>{rating}</h2>
            <p>{votes} votes</p>
            <br />
            <h2>{winner.length > 1 ? `Winners` : `Winner`}</h2>
            <p>{winner.map(win => {
              return <p>{win.player.name}: {win.vote}</p>
            })}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h4>Votes</h4>
          {guesses.map(guess => {
              return <p>{guess.player.name}: {guess.vote}</p>
          })}
        </Col>
        <Col xs={6}>
        <h4>Scores</h4>
        {players.map(player => {
            return <p>{player.name}: {player.score}</p>
        })}
        </Col>
      </Row>
      </>
  );
}

export default MovieCardMin;