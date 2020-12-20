import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { FETCH_ALL_POSTS } from '../graphql/queries';


const Home = () => {

    const {loading, data, error} = useQuery(FETCH_ALL_POSTS);

    if(data){
        console.log(data);
    }

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>
                Home
            </h1>
        </div>
    );
}
 
export default Home
