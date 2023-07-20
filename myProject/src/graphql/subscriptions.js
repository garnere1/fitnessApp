/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      weight
      reps
      userId
      userName
      max
      inputDate
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      weight
      reps
      userId
      userName
      max
      inputDate
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      weight
      reps
      userId
      userName
      max
      inputDate
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLifts = /* GraphQL */ `
  subscription OnCreateLifts($filter: ModelSubscriptionLiftsFilterInput) {
    onCreateLifts(filter: $filter) {
      id
      name
      userId
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLifts = /* GraphQL */ `
  subscription OnUpdateLifts($filter: ModelSubscriptionLiftsFilterInput) {
    onUpdateLifts(filter: $filter) {
      id
      name
      userId
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLifts = /* GraphQL */ `
  subscription OnDeleteLifts($filter: ModelSubscriptionLiftsFilterInput) {
    onDeleteLifts(filter: $filter) {
      id
      name
      userId
      userName
      createdAt
      updatedAt
      __typename
    }
  }
`;
