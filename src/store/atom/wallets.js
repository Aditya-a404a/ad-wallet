import { atom } from "recoil"


export const  ethAtom = atom ({
    key : "eth",
    default : [] 
})

export const bitAtom = atom({
    key : 'bitcoin',
    default : []

})
export const solAtom = atom({

    key : 'solana',
    default : []
})

