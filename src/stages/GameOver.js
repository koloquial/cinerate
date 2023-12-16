import { useEffect } from 'react';
import { Card } from 'react-bootstrap';

function GameOver({ room }){
    
    function getWinners(){
        const winners = [];
        room.players.forEach(player => {
            if(player.score === 5){
                winners.push(player);
            }
        })
        return winners;
    }

    return (
        <div className="">
            <Card className='card-default'>
                <h2 className="title1 centered">Winner</h2>
                <br />
                {getWinners().map(player => {
                    return <p className='title2 centered'>{player.name}</p>
                })}
                <br /><br />
                <button>Return to home</button>
            </Card>
        </div>
    )
}
export default GameOver;