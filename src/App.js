import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Main from './components/Main.js'

import { jbcL1 } from './chains/jbcL1.ts'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const App = () => {
  const { chains, provider } = configureChains(
    [jbcL1],
    [publicProvider()]
  )

  const client = createClient({
      autoConnect: true,
      connectors: [
          new MetaMaskConnector({ chains }),
      ],
      provider
  })

  return (
    <Router>
      <div className="App">
        <WagmiConfig client={client}>
            <Routes>
              <Route index element={<Main />}/>
              <Route path="/:modeText" element={<Main />}/>
              <Route path="/:modeText/:subModeText" element={<Main />}/>
            </Routes>
        </WagmiConfig>
      </div>
    </Router>
  )
}

export default App
