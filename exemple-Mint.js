import React,{useState, useContext, useEffect} from 'react'
import { ContractContext } from '../../App';
import "./Mint.css";
import { pinFileToIPFS } from './PinFileToIPFS';
import { postJSONBody } from './postJsonBody';
require('dotenv').config();

export default function Mint(props /*instance du contrat pour pouvoir communiquer avec*/) {
    const key = process.env.PINATA_KEY;
    const secret = process.env.PINATA_SECRET;
    const context = useContext(ContractContext); //web3 + comptes metamask connectés à la dapp
    const [uri, setUri] = useState();

    const mint = async () => {
        await props.contract.methods.mint(uri).send({from:context.ContractVar.accounts[0]});
    }

    const onChange = async (e) => {
        const file = e.target.files[0];
        //console.log(file);
        try{
        const rep = await pinFileToIPFS(key, secret, file);
        const ipfsFile = "https://gateway.pinata.cloud/ipfs/" + rep.data.IpfsHash;
        const responseJSON = await postJSONBody(key, secret, props.index, ipfsFile);
        setUri("https://gateway.pinata.cloud/ipfs/" + responseJSON.data.IpfsHash);
        }
        catch(error){
            console.error(error);
        } 
    }
console.log(uri);
  return (
    <div id='mint'>
    <input type='file' onChange={onChange}/>
    { uri!=undefined ?  <button onClick={mint} id="mint-btn" >Mint</button> : null }
    </div>
  )
}
