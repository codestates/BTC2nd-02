fetch('http://localhost:3000/wallet/newWallet', {
      method: 'POST',
    })
      .then(response => {
        
        if (response) {

          console.log("newWallet connect success")

        }
      })