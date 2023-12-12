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
            <h2 className='centered'>Rating: <span style={{color: 'gold'}}>{room.critMovie.imdbRating}</span></h2>
            <p className='centered'><span className='key-val'>Votes:</span> {room.critMovie.imdbVotes}</p>
            <br /><br />
            <h2 className='title1 centered'>{room.winners.length > 1 ? 'Winners' : 'Winner'}</h2>
                {room.winners[0] !== null ?
                <>
                    {room.winners.map(winner => {
                        return (
                            <>
                                {parseFloat(winner.vote) === parseFloat(room.critMovie.imdbRating) ?
                                    <p className='centered'><span className='key-val'>{winner.user.name}:</span> <span style={{color: 'gold'}}>{winner.vote}</span></p> : <></>}
                                {parseFloat(winner.vote) > parseFloat(room.critMovie.imdbRating) ?
                                    <p className='centered'><span className='key-val'>{winner.user.name}:</span> <span style={{color: 'red'}}>{winner.vote}</span></p> : <></>}
                                {parseFloat(winner.vote) < parseFloat(room.critMovie.imdbRating) ?
                                    <p className='centered'><span className='key-val'>{winner.user.name}:</span> {winner.vote}</p> : <></>}
                            </>
                        )
                    })}
                </> : <p>No winner.</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieCardResult;