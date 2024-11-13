import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NFTMarketplaceContext = createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);
        toast.success("Wallet connected: " + address);
      } catch (error) {
        console.error("Failed to connect wallet", error);
        toast.error("Failed to connect wallet");
      }
    } else {
      toast.error("Please install MetaMask");
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <NFTMarketplaceContext.Provider value={{ currentAccount, connectWallet }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};