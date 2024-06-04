import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from '../pages/About';
import Tasks1 from './Tasks1';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/auth/authActions';
import Protected from './PrivateRoute';
import HomePage from '../pages/Home';
import { useJwt } from 'react-jwt';
// import { selectIsAuthenticated } from '../redux/auth/selector';
const Menu = () => {
    let isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const token = useSelector((state: RootState) => state.auth.token);
    const {  isExpired } = useJwt(token!);

    // console.log(decodedToken);
    // console.log(isExpired);
    if (!isExpired) {
        isAuthenticated = true
    }
    else {
        isAuthenticated = false
    }
    // const isAuthenticated = useSelector(selectIsAuthenticated);
    //console.log(isAuthenticated);

    const email = useSelector((state: RootState) => state.auth.email);
    let user = ''
    if (email) {
        const parts = email.split('@');
        user = parts[0]
    }
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                <Nav.Link as={Link} to="/task">Task</Nav.Link>
                            </Nav>
                            <Nav className="ms-auto d-flex align-items-center">
                                {isAuthenticated ? (
                                    <>
                                        <span className="me-2">Hi {user}</span>
                                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                                    </>
                                ) : (
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/task" element={<Protected isAuthenticated={isAuthenticated}><Tasks1 /></Protected>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/regis" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Menu;
