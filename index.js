// 
import { ethers } from "./ethers-5.1.esm.min.js";
import { abi, contractAddress } from "./utils/constants.js";
const connectBtn = document.querySelector(".connectBtn");
const mintBtn = document.querySelector(".mintBtn");


const connect = async () => {
    console.log("connecting");
    try {
        if (typeof window.ethereum !== "undefined") { //check if metamask is intalled, only works for desktop
            await window.ethereum.request({ method: "eth_requestAccounts" })//request to open our metamask and connect
            connectBtn.innerHTML = "Connected!"
            connectBtn.classList.add("active")
            console.log("connected");
        }
    } catch (error) {
        console.log(error);
    }
}

/**@MINT */
const mintNft = async () => {
    console.log("mint clicked");
    if (typeof window.ethereum !== "undefined") {//check if metamask is intalled, only works for desktop
        console.log("Minting....");
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Get the signer from the provider (used to sign transactions)
        const signer = provider.getSigner() // Create a Web3 provider using MetaMask's Ethereum provider
        const contract = new ethers.Contract(contractAddress, abi, signer); /// Create an instance of your smart contract, providing the contract address and ABI
        try {
            const transactionResponse = await contract.mint() // Call the 'mint' function of the contract to mint an NFT
            // If successful, you can provide user feedback here
            // alert("NFT Minted Successfully");
        } catch (error) {
            console.log(error);
        }
    }
}


// GET CURENT ID 
/**
 *             const provider = new ethers.providers.Web3Provider(window.ethereum); // Get the signer from the provider (used to sign transactions)
            const signer = provider.getSigner() // Create a Web3 provider using MetaMask's Ethereum provider
            const contract = new ethers.Contract(contractAddress, abi, signer); /// Create an instance of your smart contract, providing the contract address and ABI
            const id = await contract.getCurrentTokenId() // Call the 'mint' function of the contract to mint an NFT
            console.log(parseInt(id)); //WE PARSEIN CAUSE IT RETURNS A BIG NUMBER
 */

connectBtn.addEventListener("click", connect)
mintBtn.addEventListener("click", mintNft)
