/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AllEventsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQueryQuery = { __typename?: 'Query', getEvents?: Array<{ __typename?: 'Event', id?: string | null, date?: any | null } | null> | null };

export type PostEventQueryMutationVariables = Exact<{ [key: string]: never; }>;


export type PostEventQueryMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', date?: any | null } };

export type GetEventQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventQueryQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', id?: string | null, date?: any | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AllEventsQueryDocument = new TypedDocumentString(`
    query AllEventsQuery {
  getEvents {
    id
    date
  }
}
    `) as unknown as TypedDocumentString<AllEventsQueryQuery, AllEventsQueryQueryVariables>;
export const PostEventQueryDocument = new TypedDocumentString(`
    mutation PostEventQuery {
  createEvent(date: "2024-10-25T22:49:58.867Z") {
    date
  }
}
    `) as unknown as TypedDocumentString<PostEventQueryMutation, PostEventQueryMutationVariables>;
export const GetEventQueryDocument = new TypedDocumentString(`
    query GetEventQuery {
  getEvent(id: "489769e7-d52b-4ad1-867a-97d5e3128639") {
    id
    date
  }
}
    `) as unknown as TypedDocumentString<GetEventQueryQuery, GetEventQueryQueryVariables>;