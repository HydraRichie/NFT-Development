const { ethers } = require("hardhat");

async function main()
{
    const MyNFT=await ethers.getContractFactory("MyNFT");
    const mynft=await MyNFT.deploy();
    console.log("Contract Deployed at address:",mynft.address);

}
main()
.then(()=>
{
    process.exit(0);
})
.catch((err)=>
{
    console.error(err);
    process.exit(1);
});
