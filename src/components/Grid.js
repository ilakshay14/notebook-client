import { useContext } from 'react'
import { Divider, Grid, Segment, Transition } from 'semantic-ui-react'
import PostCard from './PostCard'

import { AuthContext } from '../context/auth';
import PostForm from './PostForm';

const ThreeColumnGrid = ({ heading, posts }) => {

    const { user } = useContext(AuthContext);

    return (
        <Grid columns={1}>

            <Grid.Row>
                {
                    user && <Grid.Column width={16}>
                        <PostForm />
                    </Grid.Column>
                }
            </Grid.Row>
            {/* <Divider/> */}
            {/* <Grid.Row className="page-title">
                <h1>{heading}</h1>
            </Grid.Row> */}
            <Grid.Row>
                <Transition.Group>
                    <Grid.Column width={16} className="postCardContainer">
                        {
                            posts.map(value =>

                                <PostCard post={value} key={value.id} style={{ marginBottom: 20 }} />

                            )
                        }
                    </Grid.Column>
                </Transition.Group>

            </Grid.Row>
        </Grid>
    )
}

export default ThreeColumnGrid