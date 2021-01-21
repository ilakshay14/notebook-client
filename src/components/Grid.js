import { useContext } from 'react'
import PostCard from './PostCard';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { AuthContext } from '../context/auth';
import PostForm from './PostForm';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ThreeColumnGrid = ({ heading, posts }) => {

    const { user } = useContext(AuthContext);

    return (
        <Container style={{ marginTop: '10px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        user &&
                        <Paper elevation={0}>
                            <PostForm />
                        </Paper>
                    }
                </Grid>
                {
                    posts.map( value => <Grid item xs={12} key={value.id}>
                        <PostCard post={value} style={{ marginBottom: 20 }} />
                    </Grid>)
                }

            </Grid>
        </Container>
    )
}

export default ThreeColumnGrid