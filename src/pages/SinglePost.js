import { useQuery } from '@apollo/client';
import { Card, Grid, Button, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { FETCH_POST } from '../graphql/queries';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const { data } = useQuery(FETCH_POST, {
        variables: {
            postId
        }
    })

    const { user } = useContext(AuthContext);

    let postMarkup;
    if (!data?.getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data?.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta >{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button as='div' labelPosition='right' pointing='left'>
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount ? commentCount : 0}
                                    </Label>
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return (
        <>
        { postMarkup }
        </>
    );
}

export default SinglePost;