import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'

//components
import Modal from '../components/Modal';

//stages
import Splash from '../stages/Splash';
import AwaitPlayers from '../stages/AwaitPlayers';
import AssignMovie from '../stages/AssignMovie';
import CastVote from '../stages/CastVote';
import AwaitGuesses from '../stages/AwaitGuesses';
import RoundOver from '../stages/RoundOver';

//socket
const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER;
const socket = io.connect(SOCKET_SERVER);

function Game(){
    const [notification, setNotification] = useState('');
    const [stage, setStage] = useState('splash');
    const [room, setRoom] = useState([]);
    const [entry, setEntry] = useState({id: '', name: '', score: ''});

    //socket listen
    useEffect(() => {
        socket.on("entry", (data) => {
            setEntry(data);
        })

        socket.on("notification", (data) => {
            setNotification(data.message);
        })

        socket.on("stage_update", (data) => {
            setStage(data.stage);
        })

        socket.on("update_room", (data) => {
            setRoom(data);
        })
    }, [socket])

    //timeout notifications
    useEffect(() => {
        setTimeout(() => setNotification(''), 3000);
    }, [notification])

    return (
        <Container>
            {stage === 'splash' ? 
                <Splash socket={socket} entry={entry} /> 
                : <></>}

            {stage === 'await-players' ? 
                <AwaitPlayers 
                    socket={socket}
                    entry={entry} 
                    room={room} 
                    setNotification={setNotification} 
                /> 
                : <></>}

            {stage === 'assign-movie' ? 
                <AssignMovie 
                    socket={socket}
                    entry={entry}
                    room={room}
                />
                : <></>}
            
            {stage === 'cast-vote' ? 
                <CastVote
                    socket={socket}
                    room={room}
                    setStage={setStage}
                    setNotification={setNotification}
                />
                : <></>}
            
            {stage === 'await-guesses' ?
                <AwaitGuesses 
                    socket={socket}
                    entry={entry}
                    room={room}
                /> : <></>}

            {stage === 'round-over' ? 
                <RoundOver 
                    socket={socket}
                    entry={entry}
                    room={room}
                /> : <></>}
                
            {notification ? <Modal note={notification} /> : <></>}
            
        </Container>
    )
}

export default Game;