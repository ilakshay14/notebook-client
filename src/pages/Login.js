import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { LOGIN_USER } from '../graphql/mutations';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

const Login = (props) => {
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);
    const { onChange, onSubmit, values} = useForm(login, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy,{ data: { login: userData }}) {
            console.log(userData);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            console.log(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function login () {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input
                    type="text"
                    label="username"
                    placeholder="username"
                    name="username"
                    value={values.username}
                    error={errors.username? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    type="password"
                    label="password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    error={errors.password? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {
                                Object.values(errors).map(value => (
                                    <li key={value}>{value}</li>
                                ))
                            }
                        </ul>

                    </div>
                )
            }

        </div>
    );
}

export default Login;