import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { FETCH_ALL_POSTS } from '../graphql/queries';
import ThreeColumnGrid from '../components/Grid';

const Home = () => {

    const {loading, data, error} = useQuery(FETCH_ALL_POSTS);

    

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    if(data){
        console.log(data);
        const posts = data.getPosts;
        return (
            <div>
                <ThreeColumnGrid
                    heading="Recent Posts"
                    data={posts}
                />
            </div>
        );
    }
}
export default Home
