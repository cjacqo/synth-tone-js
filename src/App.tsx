import './App.css'
import SynthProvider from './components/synth/Synth'
import FXChain from './components/fx/FXChain'
import Keyboard from './components/keyboard/Keyboard'

function App() {
  return (
    <>
      <SynthProvider>
        <FXChain />
        <Keyboard />
      </SynthProvider>
    </>
  )
}

export default App
