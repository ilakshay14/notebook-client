import { createMedia } from '@artsy/fresnel'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'

import Heading from '../components/Heading';
import Nav from '../components/Nav';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        computer: 1920
    },
});

const Home = () => {

    return(
    <Media greaterThan="mobile">
        <Segment inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
        >
            <Heading/>
        </Segment>
    </Media>)
}

export default Home;
