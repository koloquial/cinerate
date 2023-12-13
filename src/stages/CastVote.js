import { useEffect, useState } from 'react';
import CritMovieCard from '../components/CritMovieCard';
import { CiTimer } from "react-icons/ci";
import { Card } from 'react-bootstrap';

function CastVote({ socket, room, setStage, setNotification }){
    const [castVote, setCastVote] = useState(0.0);
    const [time, setTime] = useState(30);

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
            <Card className='card-default'>
                <h2 className='title2 centered'>{room.critMovie.Title}</h2>
                <p className='centered small'><i>{room.critMovie.Year}</i></p>
                <CritMovieCard critMovie={room.critMovie} />
            </Card>
            
            <Card className='card-default'>
                <h2 className='title2 centered'><CiTimer />{time}</h2>
                <p><span className='key-val centered'>Rating:</span> {castVote}</p>
                <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step=".1" 
                    value={castVote} 
                    onChange={handleCastVote} 
                />
                <br />
                <button onClick={() => cast()}>Submit Rating</button>
            </Card>
        </div>
    )
}
export default CastVote;