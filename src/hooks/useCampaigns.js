import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { ethers } from "ethers";
import abi from "../abi/campaignAbi.json";

const useCampaigns = async () => {
    const [campaigns, setCampaigns] = useState([]);
    const { provider } = useConnection();
    const address = "0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C";
    // useEffect(() => {
    //     if (!address) return;
    //     provider
    //         .getBalance(address)
    //         .then((res) => setBalance(ethers.formatEther(res)))
    //         .catch((err) => console.error(err));
    // }, [address, provider]);

    const contract = new ethers.Contract(address, abi, provider);
    // console.log(contract);
    console.log(await contract.id());
    useEffect(() => {
    })

    return campaigns;
}

export default useCampaigns;
