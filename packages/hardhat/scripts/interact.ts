import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/ea089c5a9c344cff9adeed524046a876");

const contractAddress = "0x592f721ad0f1791532adcec7703c23bd080971dc";

//const contractABI = ["function getPrice(address) view returns (uint256)"];
const contractABI = ["function getOwner() view returns (address)"];


// Crear una instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Dirección de los tokens
const tokenA = "0x62DB176fe2E6fA98E990afeCd921CFbc7440AA56";
const tokenB = "0xF6309D84c5f47B1811386e9d7295cE77e3623859"; 

async function getPriceOfToken(tokenAddress: string) {
  try {
    console.log(`Consultando el precio de: ${tokenAddress}`);
    const price = await contract.getPrice(tokenAddress);
    if (price === "0x") {
      console.log("No price available for this address.");
  } else {
      console.log("Price:", price.toString());
  }
    console.log(`Precio bruto (raw) para ${tokenAddress}:`, price);
    if (price === "0x" || !price) {
      console.log(`No se pudo obtener el precio para el token ${tokenAddress}`);
    } else {
      console.log(`Precio obtenido para ${tokenAddress}:`, price);
    }
  } catch (error) {
    console.error("Error al obtener el precio:", error);
  }
}
async function getOwner() {
  try {
      const owner = await contract.owner();
      console.log("El propietario del contrato es:", owner);
  } catch (error) {
      console.error("Error al obtener el propietario:", error);
  }
}


getOwner();
//getPriceOfToken(tokenA);
//getPriceOfToken(tokenB);
