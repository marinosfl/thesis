export const CREATE_USER_MUTATION = `
  mutation($email: String!, $password: String!) {
    createUser(user: {
      email: $email,
      password: $password
     
    }) {
      _id
     email
     password
      
    }
  }
`;
