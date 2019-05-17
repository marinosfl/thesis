export const CREATE_USER_MUTATION = `
  mutation($email: String!, $password: String!) {
    register(user: {
      email: $email,
      password: $password
    }) {
      token
    }
  }
`;

export const CREATE_ACTION_MUTATION = `
  mutation(
    $title: String!, 
    $description: String!, 
    $latitude: Float!,
    $longitude: Float!
    ) {
    createAction(action: {
      title: $title,
      description: $description,
      latitude: $latitude,
      longitude: $longitude
    }) {
      _id
     title
     description
     latitude
     longitude
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
