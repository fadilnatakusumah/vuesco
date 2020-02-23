import { gql } from 'apollo-boost'

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!){
    signinUser(username: $username, password: $password){
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($username: String!, $email:String!, $password: String!){
    signupUser(username: $username, email: $email, password:$password){
      token
    }
  }
`

export const CREATE_POST = gql`
  mutation($caption: String!, $imageUrl: String!, $createdBy: ID!){
    createPost(caption: $caption, imageUrl: $imageUrl, createdBy: $createdBy){
      caption
      imageUrl
      createdDate
      createdBy{
        avatar
        username
        email
      }
    }
  }
`