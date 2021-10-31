const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KbMarket", function () {
  it("Should mint and trade NFT", async function () {
   const Market = await ethers.getContractFactory('KbMarket');
   const market = await Market.deploy();
   await market.deployed()
   const marketAddress = market.address;

   const NFT = await ethers.getContractFactory('NFT');
   const nft = await NFT.deploy(marketAddress);
   await nft.deployed()
   const nftAddress = nft.address;


   let listingPrice = await market.getListingPrice()
   listingPrice = listingPrice.toString();

   const auctionPrice = ethers.utils.parseUnits('100','ether');

   //test mint-token
   await nft.mintToken('https-t1');
   await nft.mintToken('https-t2');

   await market.makeMarketItem(nftAddress,1,auctionPrice,{value:listingPrice});
   await market.makeMarketItem(nftAddress,2,auctionPrice,{value:listingPrice});

   const [_,buyerAddress] = await ethers.getSigners();
   await market.connect(buyerAddress).createMarketSale(nftAddress,1,{
     value: auctionPrice
   })

   let items = await market.fetchMarketToken()

   items = await  Promise.all(items.map(async i =>{
     const tokenURI = await nft.tokenURI(i.tokenId)
     let item = {
       price: i.price.toString(),
       tokenId: i.tokenId.toString(),
       seller: i.seller,
       owner: i.owner,
       tokenURI 
     }
     return item;
   } ))
   // test all the items....
   console.log(items);

  });
});
