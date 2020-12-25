import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { CREATE_POST } from '../graphql/mutations';
import { FETCH_ALL_POSTS } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { client } from '../ApolloProvider';

const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' })
    const [errors, setErrors] = useState(null);

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_ALL_POSTS
            });
            //data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_ALL_POSTS, data:{
                getPosts: [result.data.createPost, ...data.getPosts]
            }});
            values.body = '';
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].message);
        }
    })

    function createPostCallback() {
        createPost();
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placegolder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                    />
                    <Button type="submit"
                        color="violet">
                        Submit
                </Button>
                </Form.Field>

            </Form>
            {
                // errors && <div className="ui error message">
                //     <p>{errors}</p>
                // </div>
            }
        </div>
    );
}

export default PostForm;