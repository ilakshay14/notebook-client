import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Icon, Label, Button } from 'semantic-ui-react';
import { LIKE_POST } from '../graphql/mutations';

const LikeButton = ({ user, post }) => {

    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && post.likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }

    }, [user, post.likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: post.id}
    });

    const likeButton = user ? (
        liked ? (
            <Button color='violet'>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='violet' basic>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
            <Button color='violet' basic as={Link} to="/login">
                <Icon name='heart' />
            </Button>
        )
 
    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            { likeButton}
            <Label basic color='violet' pointing='left'>
                {post.likeCount ? post.likeCount : 0}
            </Label>
        </Button>
    );
}

export default LikeButton;