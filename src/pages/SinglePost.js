import { useQuery, useMutation } from '@apollo/client';
import { Card, Grid, Button, Icon, Label, Image, Form } from 'semantic-ui-react';
import moment from 'moment';
import { FETCH_POST } from '../graphql/queries';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import { useContext, useRef, useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import { Link } from 'react-router-dom';
import { SUBMIT_COMMENT } from '../graphql/mutations';

const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const { data } = useQuery(FETCH_POST, {
        variables: {
            postId
        }
    })

    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const [comment, setcomment] = useState('');
    const [submitComment] = useMutation(SUBMIT_COMMENT, {
        variables: {
            postId,
            body: comment
        },
        update() {
            setcomment('');
            commentInputRef.current.blur();
        }
    })

    const deletePostCallback = () => {
        props.history.push('/');
    }
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
                                {
                                    user && user.username === username && (
                                        <DeleteButton postId={id} callback={deletePostCallback} />
                                    )
                                }
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="write something"
                                                name="comment"
                                                value={comment}
                                                onChange={event => setcomment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type="submit" className="ui button violet"
                                                disabled={comment.trim() === ''}
                                                onClick={submitComment}
                                            >
                                                Submit
                                        </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {
                            comments.map(comment => (
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                        {user && user.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )}
                                        <Card.Header>{comment.username}</Card.Header>
                                        <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                                        <Card.Description>{comment.body}</Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return (
        <>
            { postMarkup}
        </>
    );
}

export default SinglePost;