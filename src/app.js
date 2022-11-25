App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    } else {
      window.alert("Please connect to Metamask.");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.ethereum;
      window.web3 = new Web3(window.ethereum);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account

    const web3Instance = new Web3(ethereum);
    const account = await web3Instance.eth.getAccounts();
    const accountAddress = await account[0];
    App.account = accountAddress;
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    // creating truffle contract from smart contract json file

    const main = await $.getJSON("main.json");
    App.contracts.main = TruffleContract(main);
    App.contracts.main.setProvider(App.web3Provider);

    // Hydrate the smart contract with values from the blockchain
    App.main = await App.contracts.main.deployed();
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return;
    }

    //update app loading state
    App.setLoading(true);

    // Render Account
    $("#account").html(App.account);

    // Update app loading state
    App.setLoading(true);
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $("#loader");
    const content = $("#content");
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },

  getCAnum: async () => {
    var caNum = await App.main.userCount();
    caNum = caNum.toNumber();
    // console.log(caNum);
    // Render Account
    // $("#canum").html(caNum + 1);
  },

  createUser: async () => {
    App.setLoading(true);
    const name = $("#name").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const aadharnumber = $("#aadharnumber").val();
    const gender = $("input[type='radio'][name='genderopt']:checked").val();
    const inputAddress = $("#inputAddress").val();
    await App.main.addUser(
      name,
      email,
      phone,
      aadharnumber,
      gender,
      inputAddress,
      { from: App.account }
    );
    var caNum = await App.main.userCount();
    caNum = caNum.toNumber();
    document.getElementById("caNumDis").style.display = "block";
    $("#canum").html(caNum);
    // window.location.reload();
  },

  getUser: async (caNumber, units) => {
    // fetch the user data from users
    // console.log(caNumber);
    const userInfo = await App.main.users(caNumber);
    // console.log(userInfo);
    document.getElementById("mycontainer").style.display = "none";

    if (userInfo["name"] == "") {
      // console.log("No result found!");
      document.getElementById("noResultMsg").style.display = "block";
    } else {
      document.getElementById("mycontainer").style.display = "block";

      document.getElementById("noResultMsg").style.display = "none";
      // console.log("result found for user1");
      // getting result

      const userName = userInfo["name"];
      // const email = userInfo["email"];
      const phone = userInfo["phone"].toNumber();
      const aadhar = userInfo["aadhar"].toNumber();
      // const gender = userInfo["gender"];
      const useraddress = userInfo["useraddress"];

      // console.log(userName);
      // console.log(email);
      // console.log(phone);
      // console.log(aadhar);
      // console.log(gender);
      // console.log(useraddress);
      // Render table
      let billNumber = Math.floor(Math.random() * 100000 + 100);

      $("#caNumber").html(caNumber);
      $("#billNo").html(billNumber);

      var currentDate = new Date().toLocaleDateString();
      $("#date").html(currentDate);

      let time = new Date().toLocaleTimeString();
      $("#time").html(time);

      $("#username").html(userName);
      $("#phoneNum").html(phone);
      $("#aadharNumber").html(aadhar);
      $("#address").html(useraddress);

      $("#unitsCount").html(units);

      var energyCharges = units * 7;
      $("#energyCharges").html(energyCharges);

      var additionalCharges = 22;
      $("#additionalCharges").html(additionalCharges);

      var netBill = energyCharges + additionalCharges;
      $("#netBill").html(netBill);

      // adding generated bill to blockchain

      await App.main.addBill(
        caNumber,
        billNumber,
        currentDate,
        time,
        userName,
        units,
        energyCharges,
        additionalCharges,
        netBill,
        { from: App.account }
      );
    }
    // console.log(userInfo);
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
