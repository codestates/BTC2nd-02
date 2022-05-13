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
  let isFindA = 0;
  let isFindT = 0;

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

  useEffect(() => {
    isFindT = isFindT + 1;
    if (isFindT > 1) {
      setTxArr(txArr);
      console.log(txArr);
    }
  }, [txArr]);

  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };

  const findAccount = async () => {
    const result = await caver.kas.tokenHistory.getTransferHistoryByAccount(
      account
    );
    setAccountHis(result.items[0]);
    console.log(accountHis);
  };

  useEffect(() => {
    isFindA = isFindA + 1;
    if (isFindA > 1) {
      setAccountHis(accountHis);
      console.log(accountHis);
    }
  }, [accountHis]);

  return (
    <div>
      <div className="searchtitle">트랜잭션 해시 검색</div>
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
          color="#0c61fe"
        />
      </div>
      <div className="list">
        <div className="texttitle">검색하신 트랜잭션의 정보입니다.</div>
        <div className="textq">block Number : </div>
        <div className="text">{txArr.blockNumber}</div>
        <div className="textq">Transfer Type : </div>
        <div className="text">{txArr.transferType}</div>
        <div className="textq">To : </div>
        <div className="text">{txArr.to}</div>
        <div className="textq">From : </div>
        <div className="text">{txArr.from}</div>
        <div className="textq">Transaction Hash :</div>
        <div className="text">{txArr.transactionHash}</div>
      </div>
      <div className="searchtitle">어카운트 정보 검색</div>
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
          color="#0c61fe"
        />
      </div>
      <div className="list">
        <table>
          <div className="texttitle">
            가장 최근에 일어난 account 트랜잭션입니다.
          </div>
          <div className="textq">block Number : </div>
          <div className="text">{accountHis.blockNumber}</div>
          <div className="textq">Transfer Type : </div>
          <div className="text">{accountHis.transferType}</div>
          <div className="textq">Transaction Hash :</div>
          <div className="text">{accountHis.transactionHash}</div>
          <div className="textq">From : </div>
          <div className="text">{accountHis.from}</div>
          <div className="textq">To : </div>
          <div className="last">{accountHis.to}</div>
        </table>
      </div>
    </div>
  );
}
