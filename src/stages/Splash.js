import { useState } from 'react';

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
            <h2 className="title2">Film buff or bluff?</h2>
            
            <p>Predict how a movie faired amongst critics against your friends.</p>

            <p><b>Name:</b> {entry.name}</p>

            <input 
                type="text" 
                value={playerName} 
                placeholder="Enter name" 
                onChange={handlePlayerName} 
            />

            <button onClick={updatePlayerName}>Submit</button>
            <br /><br /><br /><br />

            <button onClick={createRoom}>Create Room</button>
            <br /><br /><br /><br />

            <input 
                type="text" 
                placeholder="Enter Room Name" 
                onChange={handleJoinRoom} 
            />
            <br />
            <button onClick={sendJoinRoom}>Join Room</button>
        </div>
    )
}

export default Splash;