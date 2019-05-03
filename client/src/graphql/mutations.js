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
