import { gql } from "@apollo/client";
import client from "./graphqlClient";

const GET_FEATURE_FLAG = gql`
    query GetFeatureFlag($name: String!) {
        featureFlag(name: $name) {
            name
            isEnabled
        }
    }
`;

const UPDATE_FEATURE_FLAG = gql`
    mutation UpdateFeatureFlag($name: String!, $isEnabled: Boolean!) {
        updateFeatureFlag(name: $name, isEnabled: $isEnabled) {
            name
            isEnabled
        }
    }
`;

export const fetchFeatureFlag = async (name: string) => {
    const { data } = await client.query({
        query: GET_FEATURE_FLAG,
        variables: { name },
    });

    return data.featureFlag;
};

export const toggleFeatureFlag = async (name: string, isEnabled: boolean) => {
    const { data } = await client.mutate({
        mutation: UPDATE_FEATURE_FLAG,
        variables: { name, isEnabled },
    });

    return data.updateFeatureFlag;

}