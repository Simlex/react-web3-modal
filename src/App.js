import logo from './logo.svg';
import './App.css';
import Web3ConnectButton from './components/WalletConnectButton';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '0f1ee345cfc20ab709b3f2852e0652ac'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
    return (<>
            <WagmiConfig config={wagmiConfig}>
                <div className="App">
                    <Web3ConnectButton />
                </div>
            </WagmiConfig>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
}

export default App;
