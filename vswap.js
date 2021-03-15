import axios from "axios";
/**
 * This will fetch the transactions of a specified token from
 * info.vswap.fi website
 * @param {string} tokenHash used for identifying what token to use
 * @param {number} first determines the amount of transactions to be returned
 * by the api. By default this returns the first 100.
 * @param {string} [sortBy] sorts the transactions in a descending order or in ascending order
 * @returns {Promise<Array>}
 */
export const LoadTransactionsFromVSwap = async (
  tokenHash,
  first = 100,
  sortBy = "desc"
) => {
  // Begin Building the URL
  const url = "https://api.bscgraph.org/subgraphs/name/vswap/exchange-pair";

  // This query string was retrieved by intercepting the API calls in the website
  const query = `query ($allPairs: [Bytes]!) {swaps(first: ${first} where: {tokensList_contains: $allPairs}, orderBy: timestamp, orderDirection: ${sortBy}) {\n    id\n    tokenIn\n    tokenOut\n    tokenInSym\n    tokenOutSym\n    tokenAmountIn\n    tokenAmountOut\n    userAddress {\n      id\n      __typename\n    }\n    value\n    timestamp\n    __typename\n  }\n}\n`;
  const variables = {
    allPairs: [tokenHash],
  };

  const response = await axios.post(url, {
    query,
    variables,
  });

  if (!response.data.data.swaps) {
    throw Error("Error fetching data from vswap: " + response.data.data);
  }

  return response.data.data.swaps;
};
