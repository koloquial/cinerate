import { useEffect, useState } from 'react';
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { Container, Row, Col } from 'react-bootstrap'
import MovieCard from '../components/MovieCard';
import { FaSearch } from "react-icons/fa";
import { getMovieInfo } from '../functions/getMovieInfo';
import CritMovieCard from '../components/CritMovieCard';

function Game(){
    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState();
    const [critMovie, setCritMovie] = useState();
    const [castVote, setCastVote] = useState(0.0);

    function handleMovieTitleInput(event){
      setMovieTitleInput(event.target.value);
    }

    function handleSearch(){
        searchMovieTitle(movieTitleInput).then(res => setSearchResults(res.Search))
    }

    function handleMovieID(){
        getMovieInfo(movieID).then(res => setCritMovie(res));
    }

    function handleCastVote(event){
        setCastVote(event.target.value);
    }

    function cast(){

    }

    useEffect(() => {
        if(movieID){
            handleMovieID();
        }
    }, [movieID])

    useEffect(() => {
        console.log('crit movie', critMovie)
    })

    return (
        <Container fluid>
            <div className="center">
                {!critMovie ?
                <Row>
                    <Col>
                        <input type="text" placeholder="Movie Title" value={movieTitleInput} onChange={handleMovieTitleInput} />
                        <button onClick={() => handleSearch()}><FaSearch /> Search</button>
                    </Col>
                </Row> : <></>}
                
                <br />
                {!movieID && searchResults ? 
                <Container>
                    <Row>
                        {searchResults.map((movie, index) => {
                            if(index === 0){
                                console.log('movie', movie)
                            }
                            if(movie.imdbID){
                                return (
                                    <Col xs={6} sm={6} md={4} lg={2}>
                                        <MovieCard 
                                            key={index}
                                            id={movie.imdbID}
                                            title={movie.Title} 
                                            year={movie.Year} 
                                            img={movie.Poster}
                                            setMovieID={setMovieID}
                                        />
                                    </Col>
                                )
                            }
                        })}
                        {console.log('search results', searchResults)}
                        {!movieID && searchResults === undefined ? <p>No movies found.</p> : <></> }
                    </Row>
                </Container> : <></>}
                {critMovie ? 
                <Container>
                        <CritMovieCard 
                            title={critMovie.Title} 
                            year={critMovie.Year} 
                            img={critMovie.Poster}
                            actors={critMovie.Actors}
                            awards={critMovie.Awards}
                            boxOffice={critMovie.BoxOffice}
                            director={critMovie.Director}
                            genre={critMovie.Genre}
                            plot={critMovie.Plot}
                            rated={critMovie.Rated}
                            rating={critMovie.Rating}
                            votes={critMovie.imdbVotes}
                        /> 

                        <br /><br />

                        <h2>Rating: {castVote}</h2>
                        <input type="range" min="0" max="10" step=".1" value={castVote} onChange={handleCastVote}></input>
                        <br /><br />
                        <button onClick={() => cast()}>Submit Rating</button>
                        </Container>: <></>}
            </div>
        </Container>
    )
}
export default Game;