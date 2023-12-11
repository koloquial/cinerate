import { Row, Col } from 'react-bootstrap';
import { LuClipboardCopy } from "react-icons/lu";
import ChatBox from '../components/ChatBox';

function AwaitPlayers({ socket, entry, room, setNotification }){
    
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

    function startGame(){
        socket.emit("start_game", { id: room.id })
    }

    return (
        <div className='center'>
            <h3>Awaiting Players</h3>

            {room.host.id === socket.id ? 
                <button onClick={startGame}>Start</button> 
                : <></>}
            
            <br /><br />

            <Row>
                <Col>
                    <h4>Room ID</h4>

                    <input type="text" value={room.id} id="room-id" />
                    <button onClick={copyToClipboard}><LuClipboardCopy /></button>
                    <br /><br />

                    <h4>Players</h4>
                    {room.players.map(player => {
                        return <p>{player.name}</p>
                    })}
                </Col>
                <Col>
                    <ChatBox socket={socket} entry={entry} room={room} />
                </Col>
            </Row>
        </div>
    )
}

export default AwaitPlayers;