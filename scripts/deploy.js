
const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 
 //KbMarket
  console.log("hi");
  
    console.log("hi");
    const NFTMarket = await hre.ethers.getContractFactory("KbMarket");
    console.log(NFTMarket);
  const nftMarket = await NFTMarket.deploy();
  console.log(nftMarket);
  await nftMarket.deployed();
  
  
  console.log("nftMarket deployed to:", nftMarket.address);

  // NFT
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);

  await nft.deployed();

  console.log("nft deployed to:", nft.address);

  let config = `export const nftMarketaddress = ${nftMarket.address} 
                export const nftaddress = ${nft.address}`
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js',JSON.parse(data))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
