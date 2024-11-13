import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Style from "./NFTDisplay.module.css";
import { Button } from "../componentsindex";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NFTDisplay = ({ contractAddress, abi }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      // Fetch NFT data from your backend or IPFS
      setNfts([
        {
          image: "https://example.com/nft.png",
          name: "NFT #1",
          description: "This is a sample NFT",
          price: "0.1",
        },
      ]);
      setLoading(false);
    };

    fetchNFTs();
  }, []);

  const buyNFT = async (price) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transaction = await contract.buyNFT(1, {
          value: ethers.utils.parseEther(price),
        });
        await transaction.wait();
        toast.success("Transaction successful!");
      } catch (error) {
        console.error("Transaction failed", error);
        toast.error("Transaction failed");
      }
    } else {
      toast.error("Please install MetaMask");
    }
  };

  if (loading) {
    return <p>Loading NFTs...</p>;
  }

  return (
    <div className={Style.nftDisplay}>
      <ToastContainer />
      {nfts.map((nft, index) => (
        <div key={index} className={Style.nftCard}>
          <img src={nft.image} alt={nft.name} className={Style.nftImage} />
          <h3>{nft.name}</h3>
          <p>{nft.description}</p>
          <p>Price: {nft.price} ETH</p>
          <Button btnName="Buy Now" handleClick={() => buyNFT(nft.price)} />
        </div>
      ))}
    </div>
  );
};

export default NFTDisplay;