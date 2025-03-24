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

export const fetchFeatureFlag = async (name: string) => {
    const { data } = await client.query({
        query: GET_FEATURE_FLAG,
        variables: { name },
    });

    return data.featureFlag;
};