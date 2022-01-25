const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
          try {
            const web3 = new Web3("http://127.0.0.1:7545");
            resolve(web3);
          } catch (error) {
            reject(error);
          }
      });
    });
  };

  const getContract = async (web3) => {
    const data = await $.getJSON("./contracts/Block.json");
    const netId = await web3.eth.net.getId();
    const deployedNetwork = data.networks[netId];
    const block = new web3.eth.Contract(
      data.abi,
      deployedNetwork && deployedNetwork.address
    );
    return block;
  };