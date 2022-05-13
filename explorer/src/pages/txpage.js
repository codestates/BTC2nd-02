import React, { useState } from "react";
import "../App.css";
import CaverExtKAS from "caver-js-ext-kas";
import axios from "axios";

const Txpage = () => {
  const accessKeyId = "KASKREJNW0ITLFCGVX5H5HSL";
  const secretAccessKey = "70TItBV28va0q8rGGwuu3vjmHX0M3PrErlmnsG54";
  const chainId = 1001;
  const [tokenArr, setTokenArr] = useState([]);
  const caver = new CaverExtKAS();
  caver.initKASAPI(chainId, accessKeyId, secretAccessKey);
  const blockNumber = async () => {
    const query = {
      kind: [caver.kas.tokenHistory.queryOptions.kind.KLAY],
      size: 2,
    };
    const result = await caver.kas.tokenHistory.getTransferHistory(
      [286],
      query
    );
    console.log(result);
  };
  return (
    <div>
      <div>트랜잭션 페이지</div>
      <button onClick={blockNumber}>트랜잭션</button>
    </div>
  );
};
export default Txpage;
