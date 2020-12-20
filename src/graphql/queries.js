import { gql } from '@apollo/client';

export const FETCH_ALL_POSTS = gql`
    {
        getPosts{
            id
            createdAt
            body
            username
            comments{
                body
                username
            }
            likes{
                username
                createdAt
            }
            commentCount
        }
    }
`;

