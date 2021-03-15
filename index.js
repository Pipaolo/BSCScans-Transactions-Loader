import axios from "axios";

// Temporarily store the API key here,
// but be sure to load the api key using ENVIRONMENT
// configurations
const API_KEY = "<ADD API KEY HERE>";

/**
 *  Loads the first 10000 transactions from the given
 * token
 *
 * @param {string} tokenHash hash of the token that you want to retrieve
 *
 * @param {number} startBlock defaults to 1 but you can set this to any block number you like
 *
 * @param {number} endBlock This can be default to 999999999 or you can set a specific block number
 *
 * @param {string} [sortBy] sorts the transactions in a descending order or in ascending order
 *
 * Available values for this are ["desc", "asc"]
 * default will be desc
 *
 * @param {number} [page] page number
 * @param {number} [offset] offsets the number of results
 * @returns {Promise<Array>}
 */
const loadTransactions = async (
  tokenHash,
  page = null,
  offset = 0,
  sortBy = "desc",
  startBlock = 1,
  endBlock = 9999999999
) => {
  // Start building the URL
  let url = `https://api.bscscan.com/api?module=account&action=tokentx`;
  url += `&contractaddress=${tokenHash}`;
  url += `&startBlock=${startBlock}`;
  url += `&endBlock=${endBlock}`;
  url += `&sort=${sortBy}`;

  // Apply Pagination
  if (page) {
    url += `&page=${page}`;
    url += `&offset=${offset}`;
  }

  url += `&apiKey=${API_KEY}`;

  const response = await axios.get(url);

  if (response.data.result) {
    return response.data.result;
  } else {
    throw Error("Error fetching transactions:" + response.data);
  }
};

// Fetch Transactions
let tokenHash = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let transactionToCheck =
  "0x8b37e381a837daf8f1db01a6c76d5f153a7cde048293236448dba2aedf294af5";

loadTransactions(tokenHash).then((transactions) => {
  transactions.forEach((t) => {
    if (t.hash === transactionToCheck) {
      console.log(t);
      return;
    }
  });
});
