import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.APOLLO_API_URL || 'http://localhost:8000/graphql';

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

export default client;
