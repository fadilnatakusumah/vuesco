import { gql } from 'apollo-boost'


export const GET_CURRENT_USER = gql`
  query{
    getCurrentUser{
      _id
      username
      email
      password
      avatar
      createdDate
      likedImage {
        _id
        caption
        imageUrl
        createdDate
      }
    }
  }
`