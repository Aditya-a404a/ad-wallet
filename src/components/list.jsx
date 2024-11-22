import { useRecoilValue , useSetRecoilState} from "recoil";
import { ethAtom, solAtom } from "../store/atom/wallets";

export default function List({type})
{
    if (type==="e")
    {
        const eth = useRecoilValue(ethAtom)
        const seteth = useSetRecoilState(ethAtom)
        function handleClick(index)
        {
            seteth( (p) =>
            {   let arr = []
                for (let i = 0 ; i<p.length;i++)
                {
                    if (i===index)
                    {
                        const t = { "address" : p[index].address,
                            "pri" : p[index].pri,
                            "visible" : true}
                        arr.push(t)

                    }
                    else{
                        arr.push(p[i])
                    }
                }
                

                return p 
            })
        }



        return <>
        <button> 🇪🇹🇭 Etherium Wallets </button>
        {
            eth.map((p,index)=>{

                return <div key={index}>
                    <h3>{index+1}. {p.address}</h3>
                    <h3>Private Key --- {p.pri}</h3>
                    <button> Check Balance </button>
                    <button key={index} onClick={handleClick(index)}>{ p.visible ? "Hide" : "Show Private Key"}</button> 
                </div>
            })
    }</>
    }
    else{
        const sol = useRecoilValue(solAtom)

        return <>
        <button> ₿ Solana Wallets </button>
        {
            sol.map((wallet,index)=>{

                return <div>
                <h3 key={index}>{index+1}. {wallet.toBase58()} </h3>
                <button> Check Balance </button>
                <button> Show Private Key </button>
                </div>
                
            })
    }</>
        
    }


}