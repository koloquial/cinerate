import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

function Splash(){
    const [playerName, setPlayerName] = useState('');
    const [notification, setNotification] = useState('');
    const [stage, setStage] = useState('splash');
    const [room, setRoom] = useState([]);
    const [joinRoom, setJoinRoom] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    function handleMessage(event){
        setMessage(event.target.value);
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

    useEffect(() => {
        socket.on("notification", (data) => {
            console.log('Notification:', data.message);
            setNotification(data.message);
        })

        socket.on("stage_update", (data) => {
            console.log('Stage Update:', data.stage)
            setStage(data.stage)
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

    useEffect(() => {
        setTimeout(() => setNotification(''), 3000);
    }, [notification])

    return (
        <Container>
            {notification ? <p>{notification}</p> : <></>}
            <Row>
                <Col>
                    {stage === 'splash' ? 
                        <div className='center'>
                            <input type="text" placeholder="Enter name" onChange={handlePlayerName} />
                            <button onClick={updatePlayerName}>Submit</button>
                            
                            <br /><br />

                            <button onClick={createRoom}>Create Room</button>
                        
                            <br /><br />
                            
                            <input type="text" placeholder="Enter Room Name" onChange={handleJoinRoom} />
                            <button onClick={sendJoinRoom}>Join Room</button>
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
                                    <button onClick={copyToClipboard}>Copy</button>
                                    <br /><br />
                                    <h4>Players</h4>
                                    {room.players.map(player => {
                                        return <p>{player.name ? player.name : player.id}</p>
                                    })}
                                    <br /><br />
                                    {room.id}
                                    <br />
                                    {socket.id}
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
                                    <input type="text" value={message} placeholder="Type message..." onChange={handleMessage} /><button id="send-message-button" onClick={sendMessage}>Send</button>
                                </Col>
                            </Row>
                        </div> : <></>}
                </Col>
            </Row>
        </Container>
    )

}

export default Splash;