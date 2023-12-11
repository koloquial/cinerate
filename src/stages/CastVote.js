import { useEffect, useState } from 'react';
import CritMovieCard from '../components/CritMovieCard';
import { CiTimer } from "react-icons/ci";

function CastVote({ socket, room, setStage, setNotification }){
    const [castVote, setCastVote] = useState(0.0);
    const [time, setTime] = useState(20);

    function handleCastVote(event){
        setCastVote(event.target.value);
    }

    function cast(){
        socket.emit("cast_vote", {id: socket.id, room: room.id, vote: castVote});
        // setTime(0);
        setStage('await-guesses');
        setNotification('Prediction submitted.');
    }

    useEffect(() => {
        setTimeout(() => setTime(time - 1), 1000);
        if(time === 0){
            cast();
        }
    }, [time])

    return (
        <div className='center'>
            <CritMovieCard critMovie={room.critMovie} />
            <br />
            <h2><CiTimer />{time}</h2>
            <h2>Rating: {castVote}</h2>
            <input 
                type="range" 
                min="0" 
                max="10" 
                step=".1" 
                value={castVote} 
                onChange={handleCastVote} 
            />
            <br /><br />
            <button onClick={() => cast()}>Submit Rating</button>
        </div>
    )
}
export default CastVote;