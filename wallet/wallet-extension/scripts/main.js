// always waits the document to be loaded when shown
document.addEventListener('DOMContentLoaded', function () {
  const blockDiv = (divId) => {
    document.getElementById(divId).style.display = "none";
  }
  const showDiv = (divId) => {
    document.getElementById(divId).style.display = "block";
  }
  
  // 처음엔 login 화면
  showDiv("login");
  blockDiv("make-wallet");
  blockDiv("main-page");
  blockDiv("show-info");


  document.getElementById('btn-login').addEventListener('click', () => {
    let password = document.getElementById("form-login-pwd").value;
    // 크롬에 저장하고 있는 것 가져오기
    chrome.storage.sync.get(
      ['mnemonic', 'password', 'address', 'privatekey'], function (result) {
        if (SHA256(password) == result.password) {
          showDiv("main-page");
          blockDiv("login");
          blockDiv("make-wallet");
          blockDiv("show-info");

          alert('로그인 성공')
        }
      }
    )
  })


  document.getElementById('step-to-make-wallet').addEventListener('click', () => {
    showDiv("make-wallet");
    blockDiv("login");
    blockDiv("main-page");
    blockDiv("show-info");
  })

  document.getElementById('step-to-main-page').addEventListener('click', () => {
    showDiv("main-page");
    blockDiv("login");
    blockDiv("make-wallet");
    blockDiv("show-info");    
  })


  // 받은 password와 니모닉 조합하여 어드레스 생성
  document.getElementById('get-address').addEventListener('click', () => {
    let password = document.getElementById("form-init-pwd").value;

    // newMnemonic API 서버에서 주소, 니모닉, 프라이빗키 수신
    fetch('http://localhost:3000/wallet/newWallet', {
      method: 'POST',
      data: { "password": password }
    }).then(response => {
      if (response) {
        response.json().then(data => {
          //브라우저 저장
          let encpwd = SHA256(password)
          document.getElementById('show-address').innerText = data.address
          document.getElementById('show-mnemonic').innerText = data.mnemonic

          chrome.storage.sync.set({
            "password": encpwd,
            "mnemonic": data.mnemonic,
            "address": data.address,
            "privatekey": data.privatekey
          });

          blockDiv("make-wallet");
          blockDiv("login");
          blockDiv("main-page");
          showDiv("show-info");
        })
      }
    })
  });


  // document.getElementById('get-info').addEventListener('click', () => {
  //   chrome.storage.sync.get(
  //     ['mnemonic', 'password', 'address', 'privatekey'], function (result) {


  //       // alert(`encpwd : ${result.password}`)
  //       // alert(`privatekey : ${result.privatekey}`)
  //       // alert(`mnemonic : ${result.mnemonic}`)

  //     }
  //   )
  // })

})


  // 로그인 구현


  // 밸런스 보여주기
