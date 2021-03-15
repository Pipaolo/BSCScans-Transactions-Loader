import axios from "axios";
import { LoadTransactionsFromVSwap } from "./vswap.js";
import { LoadTransactionsFromBSCScan } from "./bscscan.js";
import BigNumber from "bignumber.js";

// Fetch Transactions
let tokenHash = "0xC1eDCc306E6faab9dA629efCa48670BE4678779D";
let transactionToCheck =
  "0xcce1a3a5aa34b972da208771d48a095d47ab64d5f37eb5b9e2a628e960018cea";

LoadTransactionsFromBSCScan(tokenHash).then((transactions) => {
  for (let i = 0; i < transactions.length; i++) {
    const txn = transactions[i];
    if (txn.hash === transactionToCheck) {
      const generateBigUnit = (tokenDecimalInt) => {
        // string
        const unit = new Array(tokenDecimalInt - 1).fill(0).join("");
        const smallestUnitString = `0.${unit}1`;
        return new BigNumber(smallestUnitString);
      };

      const tokenDecimalInt = parseInt(txn.tokenDecimal);
      const bigValue = new BigNumber(txn.value);

      const bigTokenDecimal = generateBigUnit(tokenDecimalInt);
      const bigHumanValue = bigValue.dividedBy(
        new BigNumber(1).dividedBy(bigTokenDecimal)
      );

      console.log("transactions", txn);
      console.log(
        "bigTokenDecimal",
        bigTokenDecimal.decimalPlaces(tokenDecimalInt).toFixed()
      );
      console.log(
        "bigValue",
        bigValue.decimalPlaces(tokenDecimalInt).toFixed()
      );
      console.log(
        "transactions.amount",
        bigHumanValue.decimalPlaces(tokenDecimalInt).toFixed()
      );

      break;
    }
  }
});
