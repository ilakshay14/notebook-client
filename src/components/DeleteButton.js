import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { DELETE_POST } from '../graphql/mutations';
import { FETCH_ALL_POSTS} from '../graphql/queries';

const DeleteButton = ({user, postId}) => {

    const [ confirmOpen, setconfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        variables: {postId},
        update(proxy, result){
            setconfirmOpen(false);
            //TODO:remove post from cache
            const data = proxy.readQuery({
                query: FETCH_ALL_POSTS
            });
            //data.getPosts = [result.data.createPost, ...data.getPosts];
            const posts = data.getPosts.filter(post => post.id !== postId);
            proxy.writeQuery({ query: FETCH_ALL_POSTS, data:{
                getPosts: [...posts]
            }});
        }
    });

    return (
        <>
        <Button as='div' color="red" onClick={() => setconfirmOpen(true)} floated="right">
            <Icon name='trash' style={{ margin: 0 }} />

        </Button>
        <Confirm 
            open={confirmOpen}
            onCancel={() => setconfirmOpen(false)}
            onConfirm={deletePost}
        />
        </>
    );
}

export default DeleteButton;