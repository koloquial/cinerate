import ChatBox from "../components/ChatBox";
import CritMovieCard from "../components/CritMovieCard";
import { Card } from 'react-bootstrap';

function AwaitGuesses({ socket, entry, room }){

    return (
        <div className='center'>
            <Card className='card-default'>
            <h2 className='title2 centered'>Awaiting Guesses</h2>
            <CritMovieCard critMovie={room.critMovie} />
            </Card>
            <Card className='card-default'>
                <ChatBox socket={socket} entry={entry} room={room} />
            </Card>
        </div>
    )
}
export default AwaitGuesses;