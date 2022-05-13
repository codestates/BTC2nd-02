import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "../App.css";
import CaverExtKAS from "caver-js-ext-kas";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../components/img/KLAETLogo.png";

const theme = createTheme();

export default function SignIn() {
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            <img className="logo" src={Logo} alt="logo" width="80"></img>
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Transaction Hash"
            name="TxHash"
            autoComplete="TxHash"
            autoFocus
            onChange={onChangeTxHash}
          />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={findTxHash}
          >
            SEARCH
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            name="Account Address"
            label="Address"
            type="Address"
            id="Address"
            autoComplete="Address"
            onChange={onChangeAccount}
          />
          <div className="list">
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
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={findAccount}
          >
            SEARCH
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
