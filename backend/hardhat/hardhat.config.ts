import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        runs: 200,
        enabled: true
      }
    }
  },
  networks: {
    calibration: {
      chainId: 314159,
      url: 'https://api.calibration.node.glif.io/rpc/v1',
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  paths: {
    artifacts: './artifacts',
  },
};

export default config;
