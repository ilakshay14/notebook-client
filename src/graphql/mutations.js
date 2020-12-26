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

export const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
            ){
                id
                email
                token
                username
                createdAt
            }
    }
`;

export const CREATE_POST = gql`
    mutation createPost(
        $body: String!
    ){
        createPost(body:$body){
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

export const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId:$postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId:$postId, commentId:$commentId){
            id
            comments{
                id
                createdAt
                username
                body
            }
            commentCount
        }
    }
`

export const SUBMIT_COMMENT = gql`
    mutation ($postId: ID!, $body: String!){
        createComment(postId:$postId, body:$body){
            id
            comments{
                id
                createdAt
                username
                body
            }
            commentCount
        }
    }
`;