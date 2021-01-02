import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import HomePage from './pages/HomePage';

const App = () => {

    return (
        <AuthProvider>
            <Router>
                <Container>
                    <Nav />
                    <Route exact path='/' component={Home} />
                    <AuthRoute path="/register" component={Register} />
                    <AuthRoute path="/login" component={Login} />
                    <Route path="/posts/:postId" component={SinglePost}/>
                </Container>
            </Router>
        </AuthProvider>

    );
}

export default App;