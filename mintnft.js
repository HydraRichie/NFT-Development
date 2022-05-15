//requires dotenv file
require("dotenv").config();
//gets api-url PUBLIC AND PRIVATE KEYS from .env file
const API_URL=process.env.API_URL;
const PUBLIC_KEY=process.env.PUBLIC_KEY;
const PRIVATE_KEY=  process.env.PRIVATE_KEY;
const {createAlchemyWeb3}=require("@alch/alchemy-web3")
//instantiate web3
const web3=createAlchemyWeb3(API_URL);
//gets contracts
const contract=require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
//display contracts abi
console.log(JSON.stringify(contract.abi));
//conatract address
const contractaddress="0xbc148d42bAeCD876575a363a73eA913614d1B0b4";
//nft contract instance getting
const nftcontract=new web3.eth.Contract(contract.abi,contractaddress);

async function mintNFT(tokenURI)
{
    //GETTING NONCE DETAILS
    const nonce=await web3.eth.getTransactionCount(PUBLIC_KEY);
    //providing TRANSACTION DETAILS
    const tx=
    {
        "from":PUBLIC_KEY,
        "to":contractaddress,
        "gas":500000,
        "nonce":nonce,
        'data':nftcontract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI(),

    }


const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
signPromise
  .then((signedTx) => {
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      }
    );
  })
  .catch((err) => {
    console.log(" Promise failed:", err);
  });
}
mintNFT("https://gateway.pinata.cloud/ipfs/Qmb5iEeXS8mxDXqCMzWWXdDcupPVmTRM4wu767vp8PuF4Z");

