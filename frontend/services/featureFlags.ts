import { gql } from '@apollo/client';
import client from './graphqlClient';

interface FeatureFlag {
  id: number;
  name: string;
  isEnabled: boolean;
  createdAt: string;
}

export async function fetchFeatureFlag(name: string): Promise<FeatureFlag> {
  const { data } = await client.query({
    query: gql`
      query GetFeatureFlag($name: String!) {
        featureFlag(name: $name) {
          id
          name
          isEnabled
          createdAt
        }
      }
    `,
    variables: { name },
    fetchPolicy: 'network-only',
  });
  
  return {
    id: data.featureFlag.id,
    name: data.featureFlag.name,
    isEnabled: data.featureFlag.isEnabled,
    createdAt: data.featureFlag.createdAt 
  };
}

export async function toggleFeatureFlag(name: string, isEnabled: boolean): Promise<FeatureFlag> {
  const { data } = await client.mutate({
    mutation: gql`
      mutation UpdateFeatureFlag($name: String!, $isEnabled: Boolean!) {
        updateFeatureFlag(name: $name, isEnabled: $isEnabled) {
          id
          name
          isEnabled
          createdAt
        }
      }
    `,
    variables: { name, isEnabled },
  });
  
  return {
    id: data.updateFeatureFlag.id,
    name: data.updateFeatureFlag.name,
    isEnabled: data.updateFeatureFlag.isEnabled,
    createdAt: data.updateFeatureFlag.createdAt 
  };
}
