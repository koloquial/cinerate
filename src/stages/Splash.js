import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function Splash({ socket, entry }){
    const [joinRoom, setJoinRoom] = useState();
    const [playerName, setPlayerName] = useState();

    function handlePlayerName(event){
        setPlayerName(event.target.value);
    }

    function updatePlayerName(){
        socket.emit("update_name", {id: socket.id, name: playerName});
        setPlayerName('');
    }

    function createRoom(){
        socket.emit("create_room", {id: socket.id})
    }

    function handleJoinRoom(event){
        setJoinRoom(event.target.value)
    }

    function sendJoinRoom(){
        socket.emit("join_room", {id: socket.id, room: joinRoom})
    }

    return (
        <div className='center'>
            <Card className='card-default'>
                <h2 className="title2 centered">Film buff or bluff?</h2>
                
                <p>Think you can predict how well the public recieved a movie?</p>

                <ul style={{textAlign: 'left'}}>
                    <li>
                        <p>Compete against your friends and challenge your biases by ranking your favorite movies.</p>
                    </li>
                    <li>
                        <p>The player with the closest rating to IMDB’s rating, without going over, gets a point.</p>
                    </li>
                    <li>
                        <p>First to five points wins!</p>
                    </li>
                </ul>
              
                <p><span className="key-val">Name:</span> {entry.name}</p>

                <Row>
                    <Col>
                        <input 
                            type="text" 
                            value={playerName} 
                            placeholder="Enter name" 
                            onChange={handlePlayerName} 
                        />
                        <button onClick={updatePlayerName}>Update Name</button>
                    </Col>
                </Row>
            </Card>

            <Card className="card-default">
                <Row>
                    <Col>
                        <button onClick={createRoom}>Create Room</button>
                    </Col>
                    <Col>
                        <input 
                            type="text"
                            value={joinRoom} 
                            placeholder="Enter Room Name" 
                            onChange={handleJoinRoom} 
                        />
                        <button onClick={sendJoinRoom}>Join Room</button>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Splash;