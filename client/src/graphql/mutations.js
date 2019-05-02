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
