export const queryHasuraGraphQL = async (operationsDoc, operationName, variables, token) => {
  const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

export const getVideoStatsByUserAndVideo = async (userId, videoId, token) => {
  const operationsDoc = `
    query getVideoStatsByUser($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId }, videoId: {_eq: $videoId}}) {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc, 
    "getVideoStatsByUser", 
    { 
      userId, 
      videoId 
    }, 
    token
  );

  if (response.errors) {
    console.error(response.errors);
    return false;
  }

  return response.data.stats;
};

export const isNewUser = async (issuer, token) => {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        issuer
        email
        id
        publicAddress
      }
    }
  `;

  const response = await queryHasuraGraphQL(operationsDoc, "isNewUser", { issuer }, token);

  if (response.errors) {
    console.error(response.errors);
    return false;
  }

  return response?.data?.users?.length === 0;
};

export const insertStats = async (token, { favourited, watched, userId, videoId }) => {
  const operationsDoc = `
    mutation insertStats($favourited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
      insert_stats(objects: {
        favourited: $favourited, 
        userId: $userId, 
        videoId: $videoId, 
        watched: $watched
      }) {
        returning {
          favourited
          id
          userId
          videoId
          watched
        }
      }
    }
  `;

  return await queryHasuraGraphQL(
    operationsDoc, 
    "insertStats", 
    { favourited, watched, userId, videoId }, 
    token
  );
};

export const updateStats = async (token, { favourited, watched, userId, videoId }) => {
  const operationsDoc = `
    mutation updateStats($favourited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
      update_stats(
        _set: {
          favourited: $favourited,
          watched: $watched
        },
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }
      ) {
        affected_rows
        returning {
          favourited
          id
          userId
          videoId
          watched
        }
      }
    }
  `;

  return await queryHasuraGraphQL(
    operationsDoc, 
    "updateStats", 
    { favourited, watched, userId, videoId }, 
    token
  );
};

export const createNewUser = async (token, metadata) => {
  const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
      insert_users_one(object: {
        issuer: $issuer, 
        email: $email, 
        publicAddress: $publicAddress
      }) {
        id
        issuer
        email
        publicAddress
      }
    }
  `;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGraphQL(
    operationsDoc, 
    "createNewUser", 
    { issuer, email, publicAddress }, 
    token
  );

  console.log({response});

  return response;
};

