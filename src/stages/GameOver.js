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
                {getWinners().map(player => {
                    return <p>{player.name}</p>
                })}

                <button>Return to home</button>
            </Card>
        </div>
    )
}
export default GameOver;