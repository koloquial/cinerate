import MovieCardResult from "../components/MovieCardResult";
import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { CiTimer } from "react-icons/ci";
import ChatBox from "../components/ChatBox";

function RoundOver({ socket, entry, room }){
    const [time, setTime] = useState(10);
    const [gameOver, setGameOver] = useState(false);

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
        if(gameOver){
            socket.emit("game_over", {room: room.id});
        }else{
            socket.emit("next_round", {room: room.id});
        }
    }

    useEffect(() => {
        const winners = [];
        room.players.forEach(player => {
            if(player.score === 5){
                winners.push(player);
            }
        })
        if(winners.length > 0){
            setGameOver(true);
        }
    })

    return (
        <div className='center'>
            <Card className='card-default'>
                <h2 className='title2 centered'>
                    {!gameOver ? <>Next Round: <CiTimer />{time}</> : <>Final Round Complete</>}
                </h2>
                <MovieCardResult room={room}/>  
            </Card>
            <Card className='card-default'>
                <Row>
                    <Col>
                        <h4 className='centered'>Guesses</h4>
                        <table>
                            <tbody>
                                {room.guesses.map(guess => {
                                    return (
                                        <tr>
                                            <td>
                                                <p className='key-val'>{guess.user.name}</p>
                                            </td>
                                            <td>
                                                {parseFloat(guess.vote) === parseFloat(room.critMovie.imdbRating) ?
                                                    <p style={{color: 'gold'}}>{guess.vote}</p> : <></>}
                                                {parseFloat(guess.vote) > parseFloat(room.critMovie.imdbRating) ?
                                                    <p style={{color: 'red'}}>{guess.vote}</p> : <></>}
                                                {parseFloat(guess.vote) < parseFloat(room.critMovie.imdbRating) ?
                                                    <p>{guess.vote}</p> : <></>}   
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        
                    </Col>
                    <Col>
                        <h4 className='centered'>Scoreboard</h4>
                        <table>
                            <tbody>
                            {room.players.map(player => {
                                return (
                                    <tr>
                                        <td><p className='key-val'>{player.name}</p></td>
                                        <td><p>{player.score}</p></td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Card>
        <Card className='card-default'>
                <ChatBox socket={socket} entry={entry} room={room} />
            </Card>
        </div>
    )
}
export default RoundOver;