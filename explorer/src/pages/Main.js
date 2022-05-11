import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "../App.css";
import CaverExtKAS from "caver-js-ext-kas";

export default function Main() {
  const accessKeyId = "KASKREJNW0ITLFCGVX5H5HSL";
  const secretAccessKey = "70TItBV28va0q8rGGwuu3vjmHX0M3PrErlmnsG54";
  const chainId = 1001;
  const [txArr, setTxArr] = useState([]);
  const caver = new CaverExtKAS();
  caver.initKASAPI(chainId, accessKeyId, secretAccessKey);

  const [txHash, setTxHash] = useState("");
  const [account, setAccount] = useState("");
  const [accountHis, setAccountHis] = useState("");

  const onChangeTxHash = (e) => {
    setTxHash(e.target.value);
  };

  const findTxHash = async () => {
    const result = await caver.kas.tokenHistory.getTransferHistoryByTxHash(
      txHash
    );
    console.log(result.items[0]);
    setTxArr(result.items[0]);
  };
  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };
  const findAccount = async () => {
    const result = await caver.kas.tokenHistory.getTransferHistoryByAccount(
      account
    );
    console.log(result.items[0]);
    setAccountHis(result.items[0]);
    console.log(accountHis);
  };
  useEffect(() => {
    setAccountHis(accountHis);
    console.log(accountHis);
  }, [accountHis]);

  return (
    <div>
      <div>트랜잭션 해시 검색</div>
      <div className="searchbar">
        <input
          type="text"
          onChange={onChangeTxHash}
          placeholder="트랜잭션 해시를 입력하세요."
          className="inputtxt"
        ></input>
        <BsSearch
          size="25"
          className="searchicon"
          type="button"
          onClick={findTxHash}
        />
      </div>
      <div>어카운트 정보 검색</div>
      <div className="searchbar">
        <input
          type="text"
          onChange={onChangeAccount}
          placeholder="계정 주소를 입력하세요."
          className="inputtxt"
        ></input>
        <BsSearch
          size="25"
          className="searchicon"
          type="button"
          onClick={findAccount}
        />
      </div>
    </div>
  );
}
