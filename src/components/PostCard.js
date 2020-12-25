import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'

const PostCard = ({post}) => {

    const likePost = () => {
        console.log('like post');
    }

    const coommentOnPost = () => {
        console.log('coomment on post');
    }

    useEffect(() => {
        //console.log(post);
    }, []);

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
                    <Button as='div' labelPosition='right' onClick={likePost}>
                        <Button color='violet' basic>
                            <Icon name='heart' />
                        </Button>
                        <Label as='a' basic color='violet' pointing='left'>
                            { post.likeCount? post.likeCount : 0 }
                        </Label>
                    </Button>

                    <Button as='div' labelPosition='right' pointing='left' onClick={coommentOnPost}>
                        <Button basic color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            { post.commentCount? post.commentCount : 0 }
                        </Label>
                    </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;