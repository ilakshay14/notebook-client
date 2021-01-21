import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Nav = () => {
    // const pathname = window.location.pathname;
    // const path = pathname === '/' ? 'home' : pathname.substr(1);

    // const [activeItem, setActiveItem] = useState(path);
    // const handleItemClick = (e, { name }) => setActiveItem(name);

    const { user, logout } = useContext(AuthContext);

    const MenuBar = user ? (
        <AppBar position='static'>
            <Toolbar>
                <Link to='/'>
                    <IconButton
                        edge="start"
                        color="inherit"
                    >
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Typography variant='h5' style={{ flexGrow: 1, textAlign: 'center' }}>
                    The Notebook
                </Typography>
                <IconButton

                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={logout}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>

        </AppBar>
    ) : (<AppBar position='static'>
        <Toolbar>
            <Link to='/'>
                <IconButton
                    edge="start"
                    color="inherit"
                >
                    <HomeIcon />
                </IconButton>
            </Link>
            <Typography variant='h5' style={{ flexGrow: 1, textAlign: 'center' }}>
                The Notebook
        </Typography>
            <Link to='/login'>
                <IconButton
                    edge="end"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
            </Link>
        </Toolbar>

    </AppBar>);

    return MenuBar;
}

export default Nav;