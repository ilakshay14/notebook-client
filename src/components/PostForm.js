import { Button, Form, Icon } from 'semantic-ui-react';
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
            proxy.writeQuery({
                query: FETCH_ALL_POSTS, data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            });
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
        <div className="newPostForm">
            <Form onSubmit={onSubmit}>
                    <Form.Field>
                        <Form.Group>
                        <Form.Input
                            placeholder="any thoughts?"
                            name="body"
                            onChange={onChange}
                            value={values.body}
                            width={15}
                        />
                        <Button icon type="submit"
                            color="violet" width={1}>
                            
                            <Icon name="pencil"/>
                        </Button>
                        </Form.Group>
                    </Form.Field>
            </Form>
            {
                errors && <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{errors}</li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default PostForm;