import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ){
        register(registerInput:{
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        }){
            id
            email
            token
            username
            createdAt
        }
    }
`;