import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function AssignDealer({ room }){

    return (
        <div className='center'>
            <Card className='card-default'>
                <br /><br /><br />
                <h2 className='title2 centered'>Assigning new dealer</h2>
                <p className='centered'>{room.dealer.name}’s time expired while choosing a movie.</p>
                <br /><br /><br />
            </Card>
        </div>
    )
}

export default AssignDealer;