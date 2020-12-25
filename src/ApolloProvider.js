import App from './App';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context';

const authLink = setContext(() => {
    const token = localStorage.getItem('userToken');
    return {
        headers: {
            Authorization: token? `Bearer ${token}` : ''
        }
    }
})

const httpLink = new createHttpLink({
    uri: 'http://192.168.29.67:5000'
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)