import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'

//components
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import CritMovieCard from '../components/CritMovieCard';
import MovieCardMin from "../components/MovieCardMin";

//icons
import { LuClipboardCopy } from "react-icons/lu";
import { FiSend } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";

//functions
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { getMovieInfo } from '../functions/getMovieInfo';

//socket
const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER;
const socket = io.connect(SOCKET_SERVER);

function Splash(){
    const [playerName, setPlayerName] = useState('');
    const [notification, setNotification] = useState('');
    const [stage, setStage] = useState('splash');
    const [room, setRoom] = useState([]);
    const [joinRoom, setJoinRoom] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState();
    const [castVote, setCastVote] = useState(0.0);

    const [time, setTime] = useState(20);

    function handleSearch(){
        searchMovieTitle(movieTitleInput).then(res => setSearchResults(res.Search))
    }

    function handleMovieTitleInput(event){
        setMovieTitleInput(event.target.value);
      }

    function handleMessage(event){
        setMessage(event.target.value);
    }

    function handleCastVote(event){
        setCastVote(event.target.value);
    }

    function cast(){
        socket.emit("cast_vote", {id: socket.id, room, vote: castVote});
        setTime(0);
    }

    function sendMessage(){
        document.getElementById("send-message-button").disabled = true;
        socket.emit("send_message", {name: playerName, room: room.id, message: message})
        setMessage('');
        setTimeout(() => document.getElementById("send-message-button").disabled = false, 3000);
    }

    function handlePlayerName(event){
        setPlayerName(event.target.value);
    }

    function updatePlayerName(){
        socket.emit("update_name", {id: socket.id, name: playerName})
    }

    function createRoom(){
        socket.emit("create_room", {id: socket.id})
    }

    function startGame(){
        socket.emit("start_game", {room: room.id})
    }

    function handleJoinRoom(event){
        setJoinRoom(event.target.value)
    }

    function sendJoinRoom(){
        socket.emit("join_room", {id: socket.id, room: joinRoom})
    }

    function copyToClipboard(){
        // get the text field
        const copyText = document.getElementById("room-id");

        // select text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // copy text inside field
        navigator.clipboard.writeText(copyText.value);

        // set notification
        setNotification('Copied Room ID.');
    }

    //assign critMovie
    function handleMovieID(){
        getMovieInfo(movieID).then(res => {
            socket.emit("movie_selected", {room, movie: res})
        });
    }

    useEffect(() => {
        if(movieID){
            handleMovieID();
        }
    }, [movieID])

    //notifications
    useEffect(() => {
        socket.on("notification", (data) => {
            console.log('Notification:', data.message);
            setNotification(data.message);
        })

        socket.on("stage_update", (data) => {
            console.log('Stage Update:', data.stage)
            setStage(data.stage);

            if(data.stage === "view-round-results" && time === 0){
                setTime(10);
            }
        })

        socket.on("update_room", (data) => {
            console.log('Update Room:', data)
            setRoom(data);
        })

        socket.on("receive_message", (data) => {
            console.log('Receive Message:', data);
            setChat(data);
        })
    }, [socket])

    function formatTime(){
        if(time > 15){
            return 'green';
        }else if(time > 10){
            return 'yellow';
        }else{
            return 'red';
        }
    }

    //timeout notifications
    useEffect(() => {
        setTimeout(() => setNotification(''), 3000);
    }, [notification])

    //time cast votes
    useEffect(() => {
        //cast vote
        if(stage === 'cast-vote' && time > 0){
            setTimeout(() => setTime(time - 1), 1000);

        }else if(stage === 'cast-vote' && time === 0){
            socket.emit("cast_vote", {id: socket.id, room, vote: castVote});

        //view round results
        }else if(stage === 'view-round-results' && time > 0){
            setTimeout(() => setTime(time - 1), 1000);

        }else if(stage === 'view-round-results' && time === 0){
            //room host emit next round
            if(socket.id === room.id){
                socket.emit("next_round", {id: socket.id});
            }
        }

    }, [stage, time])

    return (
        <Container>
            <Row>
                <Col>
                    {stage === 'splash' ? 
                        <div className='center'>
                                <h2 className="title2">Film buff or bluff?</h2>
                                <p>Predict how a movie faired amongst critics against your friends.</p>

                                <br />

                                <input type="text" placeholder="Enter name" onChange={handlePlayerName} />
                                <button onClick={updatePlayerName}>Submit</button>

                                <br /><br /><br />

                                <Row>
                                    <Col>
                                        <button onClick={createRoom}>Create Room</button>
                                    </Col>
                                    <Col>
                                        <input type="text" placeholder="Enter Room Name" onChange={handleJoinRoom} />
                                        <button onClick={sendJoinRoom}>Join Room</button>
                                    </Col>
                                </Row>
                        </div>
                     : <></>}

                    {stage === 'await' ? 
                        <div className='center'>
                            <h3>Awaiting Players</h3>
                            <br />
                            <Row>
                                <Col>
                                    <h4>Room ID</h4>
                                    <input type="text" value={room.id} id="room-id" />
                                    <button onClick={copyToClipboard}><LuClipboardCopy /></button>
                                    <br /><br />
                                    <h4>Players</h4>
                                    {room.players.map(player => {
                                        return <p>{player.name ? player.name : player.id}</p>
                                    })}
                                    <br /><br />
                                    {room.id === socket.id ? <button onClick={startGame}>Start</button> : <></>}
                                </Col>
                                <Col>
                                    <h4>Chat</h4>
                                    <div className='chat-window'>
                                        {[...chat].reverse().map((line, index) => {
                                            if(index < 10){
                                                return <p><b>{line.name}:</b> {line.message}</p>
                                            }
                                        })}
                                    </div>
                                    <br />
                                    <input type="text" value={message} placeholder="Type message..." onChange={handleMessage} /><button id="send-message-button" onClick={sendMessage}><FiSend /></button>
                                </Col>
                            </Row>
                        </div> : <></>}

                    {stage === 'assign-movie' ? 
                        <div className='center'>
                            {room.dealer.id === socket.id ? 
                                <>
                                    <h3>Choose Movie</h3>
                                    <br />
                                    {console.log('room', room)}
                                    {room.critMovie.length === 0 ?
                                        <Row>
                                            <Col>
                                                <input type="text" placeholder="Movie Title" value={movieTitleInput} onChange={handleMovieTitleInput} />
                                                <button onClick={() => handleSearch()}><FaSearch /> Search</button>
                                            </Col>
                                        </Row> : <></>
                                    }

                                    {!movieID && searchResults ? 
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
                                        </Row> : <></>}
                                </> : <>

                                <h3>Awaiting Movie Choice</h3>
                                <p>{room.dealer.name} is picking a movie.</p>

                                <h4>Chat</h4>
                                    <div className='chat-window'>
                                        {[...chat].reverse().map((line, index) => {
                                            if(index < 10){
                                                return <p><b>{line.name}:</b> {line.message}</p>
                                            }
                                        })}
                                    </div>
                                    <br />
                                    <input type="text" value={message} placeholder="Type message..." onChange={handleMessage} /><button id="send-message-button" onClick={sendMessage}><FiSend /></button>
                                </>}
                        </div> : <></>}

                    {stage === 'cast-vote' ? 
                        <div className='center'>
                            <CritMovieCard 
                            title={room.critMovie[0].Title} 
                            year={room.critMovie[0].Year} 
                            img={room.critMovie[0].Poster}
                            actors={room.critMovie[0].Actors}
                            awards={room.critMovie[0].Awards}
                            boxOffice={room.critMovie[0].BoxOffice}
                            director={room.critMovie[0].Director}
                            genre={room.critMovie[0].Genre}
                            plot={room.critMovie[0].Plot}
                            rated={room.critMovie[0].Rated}
                            rating={room.critMovie[0].Rating}
                            votes={room.critMovie[0].imdbVotes}
                        /> 

                        <br /><br />

                        <h2 style={{color: formatTime()}}><CiTimer />{time}</h2>
                        <br />

                        <h2>Rating: {castVote}</h2>
                        <input type="range" min="0" max="10" step=".1" value={castVote} onChange={handleCastVote}></input>
                        <br /><br />
                        <button onClick={() => cast()}>Submit Rating</button>
                        </div> : <></>}

                        {stage === 'await-guesses' ? 
                        <div className='center'>
                            <CritMovieCard 
                            title={room.critMovie[0].Title} 
                            year={room.critMovie[0].Year} 
                            img={room.critMovie[0].Poster}
                            actors={room.critMovie[0].Actors}
                            awards={room.critMovie[0].Awards}
                            boxOffice={room.critMovie[0].BoxOffice}
                            director={room.critMovie[0].Director}
                            genre={room.critMovie[0].Genre}
                            plot={room.critMovie[0].Plot}
                            rated={room.critMovie[0].Rated}
                            rating={room.critMovie[0].Rating}
                            votes={room.critMovie[0].imdbVotes}
                        /> 
                        <h3>Waiting for all guesses</h3>
                        <br />
                            <h4>Chat</h4>
                            <div className='chat-window'>
                                {[...chat].reverse().map((line, index) => {
                                    if(index < 10){
                                        return <p><b>{line.name}:</b> {line.message}</p>
                                    }
                                })}
                            </div>
                            <br />
                            <input type="text" value={message} placeholder="Type message..." onChange={handleMessage} /><button id="send-message-button" onClick={sendMessage}><FiSend /></button>
                        </div> : <></>}

                        {stage === 'view-round-results' ? 
                        <div className='center'>
                            <h3>Round Over</h3>
                            <br />
                            <MovieCardMin 
                                img={room.critMovie[0].Poster} 
                                title={room.critMovie[0].Title} 
                                rating={room.critMovie[0].imdbRating} 
                                votes={room.critMovie[0].imdbVotes}
                                guesses={room.guesses}
                                winner={room.winner}
                                players={room.players}
                            />
                            <h2>Next round: <CiTimer />{time}</h2>
                            <br />
                        </div> : <></>}
                </Col>
                {notification ? <Modal note={notification} /> : <></>}
            </Row>
            
        </Container>
    )

}

export default Splash;