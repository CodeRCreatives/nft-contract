require("@nomiclabs/hardhat-waffle");

const projectId = "modsO4eemkmTYvvS-IvtDOtFET5IjsMM";
const fs = require('fs')
const keyData = fs.readFileSync('./p-key.text',{
  encoding: 'utf8', flag: 'r'
});
//console.log(keyData);


module.exports = {
  defaultNetwork: 'hardhat',
  networks:{
    hardhat:{
      chainId: 1337

    },
    rinkeby:{
      
      url: `https://eth-rinkeby.alchemyapi.io/v2/${projectId}`,
      accounts: [keyData]
    }
  },
  solidity:  {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

};
