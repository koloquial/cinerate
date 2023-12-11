import ChatBox from "../components/ChatBox";
import CritMovieCard from "../components/CritMovieCard";

function AwaitGuesses({ socket, entry, room }){

    return (
        <div className='center'>
            <h3>Awaiting Guesses</h3>
            <br />
            <CritMovieCard critMovie={room.critMovie} />
            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}
export default AwaitGuesses;