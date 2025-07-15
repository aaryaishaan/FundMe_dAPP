import { useState } from "react";
import { ethers } from "ethers";
import FundMeABI from "./contract/FundMeABI.json";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import HeroTxt from "./Components/Hero/HeroTxt";

const CONTRACT_ADDRESS = "0xACbDA0f09760D089BEB09C7D5630000B5E67080B"; 

function App() {
  const [account, setAccount] = useState(null);
  const [ethAmount, setEthAmount] = useState("");
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const fund = async () => {
    if (!ethAmount || !message) return alert("Fill all fields!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      FundMeABI.abi,
      signer
    );

    const tx = await contract.fundWithMessage(message, {
      value: ethers.parseEther(ethAmount),
    });
    await tx.wait();
    alert("Donation sent!");
  };

  return (
    <>
      <Navbar connectWallet={connectWallet} account={account} />

      <div className="app-container">
        <div className="overlay">
          <HeroTxt />
          <div className="fund-card">
            <input
              type="text"
              placeholder="Enter amount in Ethereum"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Write a short message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={fund}>Fund Now </button>

            <div className="wallet-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
