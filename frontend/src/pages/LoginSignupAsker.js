import {Button, Col, Container, Row} from "react-bootstrap";

export default function LoginSignupAsker(props){
    return (
        <>
            <Container className={'mt-5'}>
                <Row>
                    <Col xs={3} />
                    <Col xs={6} className='text-center mt-5'>
                        <Container fluid className='bg-dark d-flex flex-column justify-content-center text-white'>
                            <div className={'mt-3'}><h3>Meeting Rooms</h3></div>
                            <Button
                                className='py-2 my-3 rounded-0 w-25 text-center align-self-center'
                                onClick={props.onLogin}
                                variant={'outline-success'}>
                                Accedi
                            </Button>
                            <div>oppure</div>

                            <Button
                                className='py-2 my-3 rounded-0 w-25 text-center align-self-center '
                                onClick={props.onSignUp}
                                variant={'outline-success'}>
                                Registrati
                            </Button>
                            <div className={'mb-4'} />
                        </Container>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Container>
            <Container
                className='mt-4'>
                <Row className='pb-4'>
                    <Col xs={3} />
                    <Col xs={6} className='text-center my-4 py-4'>
                        <Container fluid className='bg-dark d-flex flex-column justify-content-center py-3 text-white'>
                            <div><h5>Developed by Giulia Cerniglia & Alessandro Turnu</h5></div>
                        </Container>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Container>
        </>
    )
}