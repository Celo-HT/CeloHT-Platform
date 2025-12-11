import React, { useState } from "react";
import { ethers } from "ethers";

export const WalletButton = () => {
  const [wallet, setWallet] = useState<string>("");

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWallet(address);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install a Celo-compatible wallet!");
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      {wallet ? `${wallet.slice(0,6)}...${wallet.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};