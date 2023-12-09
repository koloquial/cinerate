import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';


function Splash(){

    return (
        <Container>
            <br /><br /><br /><br />
            <Row>
                <Col>
                    <div className='center'>
                        <h1 className='title2'>Film Buff or Bluff?</h1>
                        <br />
                        <h3>Challenge fellow <span class='title1'>cine</span>philes in a game to uncover how <i>the masses</i> rated your favorite movies.</h3>
                    </div>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col>
                <div className='center'>
                <button>How to play</button>
                </div>
                </Col>
            </Row>
            <br /><br />
            <Row>
                <Col>
                    <div className='center'>
                        <h3>Private Game</h3>
                        <button>Start</button>
                        <br /><br />
                        <button>Join</button>
                    </div>
                </Col>
                <Col>
                    <div className='center'>
                        <h1 className="title1" style={{fontSize: '140px'}}>C</h1>
                    </div>
                </Col>
                <Col>
                    <div className='center'>
                        <h3>Public Game</h3>
                        <button>Start</button>
                        <br /><br />
                        <button>Join</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}

export default Splash;