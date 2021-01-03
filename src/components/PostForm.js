import { useForm } from '../util/hooks';
import { CREATE_POST } from '../graphql/mutations';
import { FETCH_ALL_POSTS } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { client } from '../ApolloProvider';
import { FormControl, FormGroup, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
            <form onSubmit={onSubmit}>
                <FormGroup row>
                    <TextField
                        error={ errors && errors.length > 0}
                        id="outlined-error"
                        label={errors ? "Error" : ''}
                        defaultValue={values.body}
                        variant="outlined"
                        placeholder="any thoughts?"
                        helperText={errors || ''}
                        onChange={onChange}
                        style={{
                            width: '80%',
                            marginRight: '5%'
                        }}
                    />
                    <Button variant='contained' type='submit' color='primary'>
                        <EditIcon />
                    </Button>
                </FormGroup>
            </form>
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