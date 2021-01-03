import { useContext } from 'react'
//import { Divider, Grid, Segment, Transition } from 'semantic-ui-react'
import PostCard from './PostCard';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { AuthContext } from '../context/auth';
import PostForm from './PostForm';

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
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12}>
                {
                    user &&
                    <Paper className={classes.paper} >
                        <PostForm />
                    </Paper>
                }
            </Grid>

        </Grid>
        // <Grid columns={1}>

        //     <Grid.Row>
        //         {
        //             user && <Grid.Column width={16}>
        //                 <PostForm />
        //             </Grid.Column>
        //         }
        //     </Grid.Row>
        //     <Grid.Row>
        //         <Grid.Column width={16} className="postCardContainer">
        //             {
        //                 posts.map(value =>

        //                     <PostCard post={value} key={value.id} style={{ marginBottom: 20 }} />

        //                 )
        //             }
        //         </Grid.Column>


        //     </Grid.Row>
        // </Grid>
    )
}

export default ThreeColumnGrid