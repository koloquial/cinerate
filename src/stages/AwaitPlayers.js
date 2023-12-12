import { Card, Row, Col } from 'react-bootstrap';
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
        if(room.players.length == 1){
            alert('You need more than 1 player to start game.')
        }else{
            socket.emit("start_game", { id: room.id })
        }
    }

    return (
        <div className='center'>
            <Card className='card-default'>
                <h2 className='title2 centered'>Awaiting Players</h2>

                {room.host.id === socket.id ?
                    <button onClick={startGame}>Start</button> 
                    : <></>}
                
                <br />

                <p className="key-val">Room ID</p>

                <input type="text" value={room.id} id="room-id" />

                <button onClick={copyToClipboard}><LuClipboardCopy /></button>
            </Card>

            <Card className='card-default'>
                <p className="key-val">Critics ({room.players.length})</p>
                
                <Row>
                    {room.players.map(player => {
                        return <Col><p>{player.name}</p></Col>
                    })}
                </Row>
            </Card>

            <Card className='card-default'>
                <ChatBox socket={socket} entry={entry} room={room} />
            </Card>
        </div>
    )
}

export default AwaitPlayers;