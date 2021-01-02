import { useQuery } from '@apollo/client';
import { FETCH_ALL_POSTS } from '../graphql/queries';

import ThreeColumnGrid from '../components/Grid';
import Loader from '../components/Loader';

const Home = () => {

    const {loading, data, error} = useQuery(FETCH_ALL_POSTS);

    if(loading){
        return(
            <Loader content="Fetching posts"/>
        )
    }

    if(error){
        console.log(error);
    }

    if(data){
        console.log(data);
        const posts = data.getPosts;
        return (
            <div>
                <ThreeColumnGrid
                    heading="Recent Posts"
                    posts={posts}
                />
            </div>
        );
    }
}
export default Home
