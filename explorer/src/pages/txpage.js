import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "../App.css";
import CaverExtKAS from "caver-js-ext-kas";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const mdTheme = createTheme();

export default function DashboardContent() {
  const accessKeyId = "KASKREJNW0ITLFCGVX5H5HSL";
  const secretAccessKey = "70TItBV28va0q8rGGwuu3vjmHX0M3PrErlmnsG54";
  const chainId = 1001;
  const [txArr, setTxArr] = useState([]);
  const caver = new CaverExtKAS();
  caver.initKASAPI(chainId, accessKeyId, secretAccessKey);

  const [txHash, setTxHash] = useState("");
  let isFindT = 0;

  const onChangeTxHash = (e) => {
    setTxHash(e.target.value);
  };

  const findTxHash = async () => {
    const result = await caver.kas.tokenHistory.getTransferHistoryByTxHash(
      txHash
    );
    console.log(result.items);
    setTxArr(result.items);
  };

  useEffect(() => {
    isFindT = isFindT + 1;
    if (isFindT > 1) {
      setTxArr(txArr);
      console.log(txArr);
    }
  }, [txArr]);

  return (
    <ThemeProvider theme={mdTheme}>
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
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Block Number</TableCell>
                <TableCell>Transfer Type</TableCell>
                <TableCell>To</TableCell>
                <TableCell>From</TableCell>
                <TableCell>Tx Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txArr.map((a) => (
                <TableRow key={a.blockNumber}>
                  <TableCell>{a.blockNumber}</TableCell>
                  <TableCell>{a.transferType}</TableCell>
                  <TableCell>{a.to}</TableCell>
                  <TableCell>{a.from}</TableCell>
                  <TableCell>{a.transactionHash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
