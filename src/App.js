import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {

    return (

        <Router>
            <Container>
                <Nav />
                <Route exact path='/' component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Container>
        </Router>

    );
}

export default App;