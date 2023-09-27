import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import CONTRACT_ABI from "../abi/campaignAbi.json";
import { useConnection } from '../context/connection';

function useCampaigns() {
    const [contractInstance, setContractInstance] = useState(null);
    const [campaignCount, setCampaignCount] = useState(0);
    const [contractData, setContractData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [campaignList, setCampaignList] = useState([]);
    const { provider } = useConnection();
    const CONTRACT_ADDRESS = "0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C";

    // Create a contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // setContractInstance(contract);
    useEffect(() => {
        async function getCampaignCount() {
            // Get the contract campaign count
            try {
                const campaignCount = await contract.id();
                setCampaignCount(Number(campaignCount));
            } catch (err) { }
        }
        if (window.ethereum) {
            getCampaignCount();
        } else {
            console.error('MetaMask or an Ethereum-compatible browser extension is not available.');
        }
    });

    const appendCampaign = async (item) => {
        const updatedArray = [...campaignList, item];
        setCampaignList(updatedArray);
    }

    useEffect(() => {
        async function initContract() {
            for (let i = 0; i < campaignCount; i++) {
                appendCampaign(await contract.crowd(i));
            }
            const campaigns = await Promise.all(campaignList);
            setContractData(campaigns);
        }

        if (window.ethereum) {
            initContract();
        } else {
            console.error('MetaMask or an Ethereum-compatible browser extension is not available.');
            setLoading(false);
        }

        return () => { }
    }, [provider, campaignCount]);

    return { contractInstance, contractData, loading };
}

export default useCampaigns;