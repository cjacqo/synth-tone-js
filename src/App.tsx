import './App.css'
import SynthProvider from './components/synth/Synth'
import FXChain from './components/fx/FXChain'

function App() {
  return (
    <>
      <SynthProvider>
        <FXChain />
      </SynthProvider>
    </>
  )
}

export default App
