
const express = require("express");
const mongoose = require("mongoose");
const func = require("./func");
const cron = require('node-cron');

require('dotenv').config();
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Success mongo connect"))
  .catch((e) => console.error(e));

  // 10초마다 반복
cron.schedule('*/10 * * * * *', () => {
  func.getBlockNumber().then(latestBlockNumber => {
    func.getSavedLatestBlockNumber().then(savedBlockNumber => {
      
      // db 없을 경우
      if(!savedBlockNumber){
        func.saveBlockData(latestBlockNumber);
      }else{
        for(let i=savedBlockNumber; i < latestBlockNumber;i++){
          func.saveBlockData(i+1);
        }        
      }
    }) 
  });
})

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app.listen(3000, () => {
  console.log("Server is starting on 3000");
});



