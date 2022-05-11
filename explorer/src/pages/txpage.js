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
  // const getHis = async () => {
  //   await axios
  //     .get("https://th-api.klaytnapi.com/v2/transfer/", {
  //       "x-chain-id": "1001",
  //       size: 100,
  //       presets: 286,
  //     })
  //     .then((res) => {
  //       setTokenArr(res);
  //       console.log(tokenArr);
  //     })
  //     .catch((err) => {
  //       console.log("!!err!!" + err);
  //     });
  // };
  return (
    <div>
      <div>트랜잭션 페이지</div>
      <button onClick={blockNumber}>트랜잭션</button>
      {/* <button onClick={getHis}>히스토리</button> */}
    </div>
  );
};
export default Txpage;
