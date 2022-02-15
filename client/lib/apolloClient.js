import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import getCsrfToken from '../auth/getCsrfToken';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )}
);

const authLink = setContext(async (_, { headers }) => {
  const csrfToken = await getCsrfToken()
  
  if (csrfToken) {
    return {
      headers: {
        ...headers,
        'X-CSRF-TOKEN': csrfToken
      }
    }
  }
});

const link = from([
    errorLink,
    authLink,
    createUploadLink({ uri: "http://localhost:5000/graphql", credentials: 'include' }),
]);
  
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export default createApolloClient;