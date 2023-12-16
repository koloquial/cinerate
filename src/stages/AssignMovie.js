import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { getMovieInfo } from '../functions/getMovieInfo';
import { FaSearch } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import ChatBox from '../components/ChatBox';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

function AssignMovie({ socket, entry, room }){
    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState(null);
    const [time, setTime] = useState(30);
    const [loading, setLoading] = useState(false);

    function handleMovieTitleInput(event){
        setMovieTitleInput(event.target.value);
    }
    
    function handleSearch(){
        setLoading(true);
        searchMovieTitle(movieTitleInput)
        .then(res => setSearchResults(res.Search))
        .then(() => setLoading(false));
    }

    function handleMovieID(){
        getMovieInfo(movieID)
        .then(res => socket.emit("movie_selected", {room: room.id, movie: res}))
        .then(() => setLoading(false));
    }

    useEffect(() => {
        if(movieID){
            handleMovieID();
            setLoading(true);
        }
    }, [movieID])

    useEffect(() => {
        //count down clock if dealer
        console.log('called', loading, room.dealer.id, socket.id)
        if(!loading && room.dealer.id === socket.id){
            setTimeout(() => setTime(time - 1), 1000);
            //forfeit turn if 30 seconds pass
            if(time === 0){
                socket.emit("assign_dealer", {room: room.id})
            }
        }
    }, [time])

    useEffect(() => {
        socket.on("update_time", (data) => {
            setTime(data);
        });
    }, [socket])


    return (
        <div className='center'>
            {room.dealer.id === socket.id ? 
                <>
                    <Card className='card-default'>
                        <h2 className="title2 centered">Choose Movie</h2>
                        <h2 className='title2 centered'><CiTimer />{time}</h2>
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
                    </Card>

                    {!loading && !movieID && searchResults ? 
                        <Card className='card-default'>
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
                            </Row>
                        </Card> : <Loading />}
                </> : 
                <>
                    <Card className='card-default'>
                        <h2 className='title2 centered'>Awaiting Movie Choice</h2>
                        <p className='centered'>{room.dealer.name} is picking a movie.</p>
                    </Card>
                    <Card className='card-default'>
                        <ChatBox socket={socket} entry={entry} room={room} />
                    </Card>
                </>}
        </div>
    )
}
export default AssignMovie;