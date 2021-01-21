import { useForm } from '../util/hooks';
import { CREATE_POST } from '../graphql/mutations';
import { FETCH_ALL_POSTS } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { client } from '../ApolloProvider';
import { FormControl, FormGroup, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    form: {

        display: 'flex',

    }
}));

const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' })
    const [errors, setErrors] = useState(null);
    const classes = useStyles();

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
        console.log(values)
        createPost();
    }

    return (
        <div className="newPostForm">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} className={classes.form}>
                        <TextField
                            error={errors ? true : false}
                            id="outlined-error"
                            label={errors ? errors : ''}
                            defaultValue={values.body}
                            fullWidth
                            variant="outlined"
                            placeholder="any thoughts?"
                            onChange={onChange}
                            style={{ marginRight: 5}}
                        />


                        <Button variant='contained' type='submit' color='primary'>
                            <EditIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default PostForm;