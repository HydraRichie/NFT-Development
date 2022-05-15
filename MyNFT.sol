//SPDEX-Licensce-Identifier:UNDEFINED
pragma solidity >= 0.5.0< 0.9.0;
//importing required solidity inbuilts contracts 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//initializing contracts

contract MyNFT is ERC721URIStorage,Ownable
{
    using Counters for Counters.Counter;
    Counters.Counter private _idTokens;
    //DEFINING THE NAME OF THE TOKEN USING CONSTRUCTOR FUNCTION
    constructor()ERC721("Hydra Richie","HR"){}
    //fUNCTION FOR MINTING THE NFT
    function mintNFT(address recepient,string memory tokenURI)public onlyOwner returns(uint)
    {
        //to generate a unique id everytime let us increment it
        _idTokens.increment();
        //assigning the present token id to a variable called newtokenid
        uint newTokenid=_idTokens.current();
        //mint nft aa function requireing 2  paramaetrs they are address of recepient and the newtoken id
        _mint(recepient,newTokenid);
        //settokenuri functin requires 2 parameters they are newtokenid and tokenuri
        _setTokenURI(newTokenid, tokenURI);
        //return thr newtokenid
        return newTokenid;
    }
}