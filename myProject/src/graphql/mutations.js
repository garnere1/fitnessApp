/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createLifts = /* GraphQL */ `
  mutation CreateLifts(
    $input: CreateLiftsInput!
    $condition: ModelLiftsConditionInput
  ) {
    createLifts(input: $input, condition: $condition) {
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
export const updateLifts = /* GraphQL */ `
  mutation UpdateLifts(
    $input: UpdateLiftsInput!
    $condition: ModelLiftsConditionInput
  ) {
    updateLifts(input: $input, condition: $condition) {
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
export const deleteLifts = /* GraphQL */ `
  mutation DeleteLifts(
    $input: DeleteLiftsInput!
    $condition: ModelLiftsConditionInput
  ) {
    deleteLifts(input: $input, condition: $condition) {
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
