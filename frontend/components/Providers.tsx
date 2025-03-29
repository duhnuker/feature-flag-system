"use client"

import { ReactNode } from 'react';
import { FeatureFlagProvider } from "../context/FeatureFlagProvider";
import { ApolloProvider } from "@apollo/client";
import client from "../services/graphqlClient";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <FeatureFlagProvider>
        {children}
      </FeatureFlagProvider>
    </ApolloProvider>
  );
}
