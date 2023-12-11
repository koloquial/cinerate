import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { getMovieInfo } from '../functions/getMovieInfo';
import { FaSearch } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import ChatBox from '../components/ChatBox';
import MovieCard from '../components/MovieCard';

function AssignMovie({ socket, entry, room }){
    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState(null);
    const [time, setTime] = useState(60);

    function handleMovieTitleInput(event){
        setMovieTitleInput(event.target.value);
    }
    
    function handleSearch(){
        searchMovieTitle(movieTitleInput)
        .then(res => setSearchResults(res.Search))
    }

    function handleMovieID(){
        getMovieInfo(movieID)
        .then(res => socket.emit("movie_selected", {room: room.id, movie: res}));
    }

    useEffect(() => {
        if(movieID){
            handleMovieID();
        }
    }, [movieID])

    useEffect(() => {
        setTimeout(() => setTime(time - 1), 1000);
        if(time === 0){
            //forfeit turn
        }
    }, [time])

    return (
        <div className='center'>
            {room.dealer.id === socket.id ? 
                <div>
                    <h3>Choose Movie</h3>
                    <br />
                    <p><CiTimer /> {time}</p>
                    {!room.critMovie ?
                        <div>
                            <input 
                                type="text" 
                                placeholder="Movie Title" 
                                value={movieTitleInput} 
                                onChange={handleMovieTitleInput} 
                            />
                            <button onClick={() => handleSearch()}><FaSearch /> Search</button>
                        </div> : <></>}

                    {!movieID && searchResults ? 
                        <Row>
                            {searchResults.map((movie, index) => {
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
                            {!movieID && searchResults === undefined ? <p>No movies found.</p> : <></> }
                        </Row> : <></>}
                </div> : <>
                    <h3>Awaiting Movie Choice</h3>
                    <p>{room.dealer.name} is picking a movie.</p>

                    <ChatBox socket={socket} entry={entry} room={room} />
                </>}
        </div>
    )
}
export default AssignMovie;