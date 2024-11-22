
import { useRecoilValue,useSetRecoilState } from "recoil";
import { generateMnemonic } from "bip39";
import { seedAtom } from "../store/atom/seed";


export default function Phrase()
{   const phrase = useRecoilValue(seedAtom)
    const setPhrase = useSetRecoilState(seedAtom)

    function create()
    {
        const mn  = generateMnemonic()
        setPhrase(mn)
    }

    return <>
    <div>
    <button onClick={create}> Create a new seed phrase </button>
    <Phraselist/>
    </div>
    </>
}
function  Phraselist()
{
    const phrase = useRecoilValue(seedAtom)
    const word = phrase.split(" ")
    if ( word.length >1)
    {
        return <div>
        {
            word.map((word,index)=>{
                return <button key={index}>{index+1}. {word}</button>
            })
        }
        <button > Copy </button>  
        </div>
    }
    else{
    return <div>
        
        </div>
    }
}