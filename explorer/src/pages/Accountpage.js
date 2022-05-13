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
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const accessKeyId = "KASKREJNW0ITLFCGVX5H5HSL";
  const secretAccessKey = "70TItBV28va0q8rGGwuu3vjmHX0M3PrErlmnsG54";
  const chainId = 1001;
  const caver = new CaverExtKAS();
  caver.initKASAPI(chainId, accessKeyId, secretAccessKey);

  const [account, setAccount] = useState("");
  const [accountHis, setAccountHis] = useState([]);
  let isFindA = 0;

  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };

  const findAccount = async () => {
    const result = await caver.kas.tokenHistory.getTransferHistoryByAccount(
      account
    );
    setAccountHis(result.items);
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
    <ThemeProvider theme={mdTheme}>
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
                <TableCell align="right">Tx Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountHis.map((a) => (
                <TableRow key={a}>
                  <TableCell align="right">{a.blockNumber}</TableCell>
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

function Dashboard() {
  return <DashboardContent />;
}
