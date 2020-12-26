import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({ post }) => {
    const { user } = useContext(AuthContext);
    const { id, likes, likeCount} = post;

    const coommentOnPost = () => {
        console.log('coomment on post');
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${post.id}`}>{moment(post.createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {post.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={ user } post={{ id, likes, likeCount }}/>

                <Button as='div' labelPosition='right' pointing='left' as={Link} to={`/post/${post.id}`}>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {post.commentCount ? post.commentCount : 0}
                    </Label>
                </Button>
                {
                    user && user.username === post.username && (
                        <DeleteButton user={user} postId={ id }/>
                    )
                }
            </Card.Content>
        </Card>
    );
}

export default PostCard;