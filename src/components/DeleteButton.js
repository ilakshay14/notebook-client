import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { DELETE_POST } from '../graphql/mutations';
import { FETCH_ALL_POSTS} from '../graphql/queries';

const DeleteButton = ({ postId, callback }) => {

    const [ confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        variables: {postId},
        update(proxy, result){
            setConfirmOpen(false);
            //TODO:remove post from cache
            const data = proxy.readQuery({
                query: FETCH_ALL_POSTS
            });
            //data.getPosts = [result.data.createPost, ...data.getPosts];
            const posts = data.getPosts.filter(post => post.id !== postId);
            proxy.writeQuery({ query: FETCH_ALL_POSTS, data:{
                getPosts: [...posts]
            }});

            if(callback) callback();

        }
    });

    return (
        <>
        <Button as='div' color="red" onClick={() => setConfirmOpen(true)} floated="right">
            <Icon name='trash' style={{ margin: 0 }} />

        </Button>
        <Confirm 
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePost}
        />
        </>
    );
}

export default DeleteButton;