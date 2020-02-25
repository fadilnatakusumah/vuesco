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


export const GET_POSTS = gql`
  query{
    getPosts{
      _id
      caption
      imageUrl
      createdBy{
        avatar
        username
        email
      }
      createdDate
      likes
      comments{
        commentBody
        commentDate
      }
    }
  }
`

export const GET_MY_POSTS = gql`
  query($user_id: String!){
    getMyPosts(user_id: $user_id){
      _id
      caption
      imageUrl
      createdBy{
        avatar
        username
        email
      }
      createdDate
      likes
      comments{
        commentBody
        commentDate
      }
    }
  }
`