export const queryHasuraGraphQL = async (operationsDoc, operationName, variables) => {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
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
  
  const operationsDoc = `
    query MyQuery {
      users {
        id
        email
        issuer
        publicAddress
      }
    }
  `;
  
  function fetchMyQuery() {
    return queryHasuraGraphQL(
      operationsDoc,
      "MyQuery",
      {}
    );
  }
  
  export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
