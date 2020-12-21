import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { REGISTER_USER } from '../graphql/mutations';

const Register = (props) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            console.log(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();

    }

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
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
                    type="email"
                    label="email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    error={errors.email? true : false}
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
                <Form.Input
                    type="password"
                    label="confirmPassword"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.coonfirmPassword? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Submit
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

export default Register;