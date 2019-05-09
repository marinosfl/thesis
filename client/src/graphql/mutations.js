export const CREATE_USER_MUTATION = `
  mutation($email: String!, $password: String!) {
    register(user: {
      email: $email,
      password: $password
     
    }) {
      _id
     email
     password
      
    }
  }
`;

export const CREATE_ACTION_MUTATION = `
  mutation($title: String!, $description: String!) {
    createAction(action: {
      title: $title,
      description: $description
     
    }) {
      _id
     title
     description
     author {
       _id
       firstName
     }
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = `
  mutation($email: String!, $firstName: String, $lastName: String) {
    updateProfile(profileData: {
      email: $email,
      firstName: $firstName,
      lastName: $lastName
    }) {
      _id
      email
      firstName
      lastName
    }
  }
`;
