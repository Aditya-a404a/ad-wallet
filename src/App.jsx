import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Phrase from './components/Phrase'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { seedAtom } from './store/atom/seed'
import { ethAtom, solAtom } from './store/atom/wallets'
import  List from './components/list'
import { Wallet, HDNodeWallet } from "ethers";

import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

function App() {
 

  return (
    <>
    <RecoilRoot>
    <h1> AD + WALLET </h1>
    <Phrase/>
    <Addwallet/>
    
    </RecoilRoot>
    </>
  )
}
function Addwallet()
{
  const phrase = useRecoilValue(seedAtom)
  const  [card,setCard]  = useState(false)
  const etharr = useRecoilValue(ethAtom)
  const setetharr = useSetRecoilState(ethAtom)
  const solarr = useRecoilValue(solAtom)
  const setSolarr = useSetRecoilState(solAtom)
  
  function handle()
  {
    setCard(true)
  }
  function createSolana() {
    
    const seed = mnemonicToSeed(phrase);
    const path = `m/44'/501'/${solarr.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setSolarr(p=>[...p,keypair.publicKey])
    }
    async function createEther() {
      const seed = await mnemonicToSeed(phrase);
      const derivationPath = `m/44'/60'/${etharr.length}'/0'`;
       const hdNode = HDNodeWallet.fromSeed(seed);
       const child = hdNode.derivePath(derivationPath);
       const privateKey = child.privateKey;
       const wallet = new Wallet(privateKey);
       setetharr(p=> [...p,{ "address" : wallet.address,
                             "pri" : privateKey,
                             "visible" : false
       }])
     
  }
  
  if (phrase.length > 0)
  {
    return <>
    { card && 
    <div>
    <div> 
      <button onClick={createEther}> Create a Ether Wallet </button>
      <button onClick={createSolana}> Create a Sol Wallet </button>
    </div>
    
    <List type="e"/>
    <List type="s"/>

    
    </div>

    }
    { !card && <button onClick={handle}>Create a Wallet </button> } 
    

    </>
  }
  else{
    return <button>Create a Seed First to add walllet </button>
  }
}

export default App
