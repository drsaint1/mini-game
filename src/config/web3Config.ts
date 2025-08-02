import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { mainnet, sepolia } from "wagmi/chains";

export const etherlinkMainnet = {
  id: 42793,
  name: "Etherlink Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "XTZ",
    symbol: "XTZ",
  },
  rpcUrls: {
    default: {
      http: ["https://node.mainnet.etherlink.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherlink Explorer",
      url: "https://explorer.etherlink.com",
    },
  },
} as const;

export const etherlinkTestnet = {
  id: 128123,
  name: "Etherlink Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XTZ",
    symbol: "XTZ",
  },
  rpcUrls: {
    default: {
      http: ["https://node.ghostnet.etherlink.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherlink Testnet Explorer",
      url: "https://testnet-explorer.etherlink.com",
    },
  },
  testnet: true,
} as const;

export const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "your_project_id_here";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Car Race Game",
  description: "A thrilling 3D car racing game on Etherlink",
  url: "https://your-domain.com",
  icons: ["https://your-domain.com/icon.png"],
};

const chains = [etherlinkMainnet, etherlinkTestnet, mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});
