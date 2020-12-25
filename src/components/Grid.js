import { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from './PostCard'

import { AuthContext } from '../context/auth';
import PostForm from './PostForm';

const ThreeColumnGrid = ({ heading, posts}) => {

    const { user } = useContext(AuthContext);
    
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>{heading}</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    user && <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                }
                <Transition.Group>
                {
                    posts.map(value =>
                        <Grid.Column key={value.id} style={{ marginBottom: 20 }}>
                            <PostCard post={value} />
                        </Grid.Column>
                    )
                }
                </Transition.Group>

            </Grid.Row>
        </Grid>
    )
}

export default ThreeColumnGrid