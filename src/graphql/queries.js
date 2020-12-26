import { gql } from '@apollo/client';

export const FETCH_ALL_POSTS = gql`
    {
        getPosts {
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

export const FETCH_POST = gql`
    query ($postId: ID!){
        getPost(postId:$postId){
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


