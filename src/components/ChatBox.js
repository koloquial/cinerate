import { useState } from 'react';
import { FiSend } from "react-icons/fi";

function ChatBox({ socket, entry, room }){
    const [message, setMessage] = useState('');

    function sendMessage(){
        //send message to server
        socket.emit("send_message", {id: room.id, name: entry.name, message: message});
        //remove text from input
        setMessage('');
    }

    function handleMessage(event){
        setMessage(event.target.value);
    }

    return (
        <div>
            <p className="key-val">Chat</p>
            <div className='chat-window'>
                {room.chat.map(line => {
                    return <><span style={{color: 'white'}}>{line.name}:</span> <span style={{color: 'gray'}}>{line.message}</span><br /></>
                })}
            </div>
            <br />
            <input 
                type="text" 
                value={message} 
                placeholder="Type message..." 
                onChange={handleMessage} 
            />
            <button id="send-message-button" onClick={sendMessage}><FiSend /></button>
        </div>
    )
}

export default ChatBox;