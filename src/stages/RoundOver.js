import MovieCardResult from "../components/MovieCardResult";
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { CiTimer } from "react-icons/ci";

function RoundOver({ socket, room }){
    const [time, setTime] = useState(10);

    useEffect(() => {
        setTimeout(() => setTime(time - 1), 1000);
        if(time === 0){
            //call next round if host
            if(room.host.id === socket.id){
                nextRound();
            }
        }
    }, [time])

    function nextRound(){
        socket.emit("next_round", {room: room.id});
    }

    return (
        <div className='center'>
            <MovieCardResult room={room}/>
            <br />
            <h4>Winner</h4>
            {room.winners[0] !== null ?
            <>
                {room.winners.map(winner => {
                    return (
                        <>
                            {parseFloat(winner.vote) === parseFloat(room.critMovie.imdbRating) ?
                                <p><span style={{color: 'gold'}}>{winner.user.name}: {winner.vote}</span></p> : <></>}
                            {parseFloat(winner.vote) > parseFloat(room.critMovie.imdbRating) ?
                                <p><span style={{color: 'red'}}>{winner.user.name}: {winner.vote}</span></p> : <></>}
                            {parseFloat(winner.vote) < parseFloat(room.critMovie.imdbRating) ?
                                <p>{winner.user.name}: {winner.vote}</p> : <></>}
                        </>
                    )
                })}
            </> : <p>No winner.</p>}
            <br />
            <Row>
                <Col>
                    <h4>Guesses</h4>
                    {room.guesses.map(guess => {
                        return (
                            <>
                                {parseFloat(guess.vote) === parseFloat(room.critMovie.imdbRating) ?
                                    <p><span style={{color: 'gold'}}>{guess.user.name}: {guess.vote}</span></p> : <></>}
                                {parseFloat(guess.vote) > parseFloat(room.critMovie.imdbRating) ?
                                    <p><span style={{color: 'red'}}>{guess.user.name}: {guess.vote}</span></p> : <></>}
                                {parseFloat(guess.vote) < parseFloat(room.critMovie.imdbRating) ?
                                    <p>{guess.user.name}: {guess.vote}</p> : <></>}
                            </>
                        )
                    })}
                </Col>
                <Col>
                    <h4>Scoreboard</h4>
                    {room.players.map(player => {
                        return <p>{player.name}: {player.score}</p>
                    })}
                </Col>
            </Row>
            <p>Next Round: <CiTimer /> {time}</p>
        </div>
    )
}
export default RoundOver;