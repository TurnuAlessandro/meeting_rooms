import {Container, Dropdown, Nav, Navbar} from "react-bootstrap"

export default function NavigationBar(props){
    const {
        user,
        onLoginButtonClick,
        onSignUpButtonClick,
        onLogoutButtonClick
    } = props

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed='topppp'>
            <Container>
                <Navbar.Brand href="#home">Meeting Rooms</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav>
                        <Nav.Link disabled className='text-white'>
                            {user ?
                                <span style={{fontSize: '1.1em'}}>
                                    <strong>{user.name}</strong>
                                    {user.role === 'ADMIN' ?
                                        <span style={{marginLeft: '5px', fontSize: '.8em'}}>
                                            - admin
                                        </span> : ''}
                                </span> : null}
                        </Nav.Link>
                        {!user ?
                            <Dropdown align='end' className='rounded-0'>
                                <Dropdown.Toggle variant="outline-success" id="dropdown-basic" className='rounded-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='rounded-0'>

                                    <Dropdown.Item onClick={onLoginButtonClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                            <path fillRule="evenodd"
                                                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                        </svg>
                                        <span style={{marginLeft: '10px'}}>Accedi</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={onSignUpButtonClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            <path fillRule="evenodd"
                                                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                        <span style={{marginLeft: '10px'}}>Iscriviti</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <Nav.Link onClick={onLogoutButtonClick} className='rounded-0 btn btn-outline-danger text-white'>
                                <span style={{marginRight: '10px'}}>Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill='white'>
                                    <path d="M10 2v2h12v16h-12v2h14v-20h-14zm0 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/>
                                </svg>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}