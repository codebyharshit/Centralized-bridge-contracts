import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { Token } from "./artifacts/contracts/Token.sol/Token.json";

// const alchemyUrl = process.env.ALCHEMY_URL;
// const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
const infuraUrlMatic =
  "https://polygon-mainnet.infura.io/v3/fdc43394106a4868bf64a3f7fdcaed14";
const providerMatic = new ethers.providers.JsonRpcProvider(infuraUrlMatic);

const infuraUrlEth =
  "https://polygon-mainnet.infura.io/v3/fdc43394106a4868bf64a3f7fdcaed14";
const providerEth = new ethers.providers.JsonRpcProvider(infuraUrlEth);

const PRIVATE_KEY_USER =
  "2d1f1100effef7adcf2d875fd74e074bfae098cfb45bcf58a5453b78d206afaf";

const TokenMaticAddress = "0x627098Fcc59D1ac36899f12Acf0c5A9AAcBEd01b";
const BridgeMaticAddress = "0x40AEFecb2dC5Ad4E96f7cFB437Ea4DC07862B68c";

// const TokenEthAddress = "";
// const BridgeEthAddress = "";

const contractBridgeEth = new ethers.Contract(
  BridgeEthAddress,
  Bridge,
  providerEth
);
const contractBridgeMatic = new ethers.Contract(
  BridgeMaticAddress,
  Bridge,
  providerMatic
);

export const events = () => {
  //  const eventsETH = async () => {
  //   contractBridgeEth.on("BRIDGE", async (from, amount, chainName, event) => {
  //     // const _amount = parseInt(amount, 18);
  //     // const details = await TxnDetails.create({
  //     //   txnType: event.event,
  //     //   chainName: chainName,
  //     //   amount: _amount,
  //     //   from: from,
  //     //   txHash: event.transactionHash,
  //     // });
  //     // console.log(details);

  //     console.log(from, amount, chainName, event);

  //     const wallet = new ethers.Wallet(PRIVATE_KEY_USER, providerMatic);
  //     const signer = wallet.connect(providerMatic);
  //     console.log("signer", signer);

  //     const contractMATIC = new ethers.Contract(TokenMaticAddress, Token, signer);
  //     console.log("contractMATIC", contractMATIC);
  //     try {
  //       const tx = await contractMATIC.transfer(
  //         from,
  //         ethers.utils.parseEther(amount)
  //       );
  //       await tx.wait();
  //     } catch (error) {
  //       console.error("Error transferring tokens:", error);
  //     }
  //   });
  // };

  const eventsMATIC = async () => {
    contractBridgeMatic.on("BRIDGE", async (from, amount, chainName, event) => {
      // const _amount = parseInt(amount, 18);
      // const details = await TxnDetails.create({
      //   txnType: event.event,
      //   chainName: chainName,
      //   amount: _amount,
      //   from: from,
      //   txHash: event.transactionHash,
      // });
      // console.log(details);

      console.log(from, amount, chainName, event);

      const wallet = new ethers.Wallet(PRIVATE_KEY_USER, providerEth);
      const signer = wallet.connect(providerEth);
      console.log("signer", signer);

      const contractETH = new ethers.Contract(TokenEthAddress, Token, signer);
      console.log("contractETH", contractETH);
      try {
        const tx = await contractETH.transfer(
          from,
          ethers.utils.parseEther(amount)
        );
        await tx.wait();
      } catch (error) {
        console.error("Error transferring tokens:", error);
      }
    });
  };
  eventsMATIC();
};
