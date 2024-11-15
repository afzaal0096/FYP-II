import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Explore & Buy NFTs",
      link: "discover",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Upload and Sell NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;