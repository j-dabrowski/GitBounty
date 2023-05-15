// This example shows how to make a call to an open API ( authentication required)

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below

// make HTTP request
const url = `https://api.github.com/users/Chusynuk`;
//*!Some how i not manage to store the token value in .env without error.
//*! Check guys if you manage it.
const token = "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";
const headers = { Authorization: `Bearer ${token}` };

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
// Example of query: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD
const userGitHubRequest = Functions.makeHttpRequest({
  url: url,
  method: "GET",
  headers: headers,
});

// Execute the API request (Promise)
const userGitHubResponse = await userGitHubRequest;
if (userGitHubResponse.error) {
  console.error(userGitHubResponse.error);
  throw Error("Request failed");
}

const data = userGitHubResponse["data"];
if (data.Response === "Error") {
  console.error(data.Message);
  throw Error(`Functional error. Read message: ${data.Message}`);
}

// extract the price
const userDetails = data["login"];
console.log(`The name of the user is ${userDetails}`);

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeString(userDetails);
