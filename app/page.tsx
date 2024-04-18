"use client";

import { ethers } from "ethers";
import { FormEvent, useEffect, useState } from "react";
import InstaContract from "@/build/contracts/InstaContract.json";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract>();
  const [account, setAccount] = useState<ethers.JsonRpcSigner>();
  const init = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const instance = new ethers.Contract(
        InstaContract.networks[5777].address,
        InstaContract.abi,
        signer);
      setContract(instance);
      setAccount(signer);
    } else {
      alert("MetaMask not installed");
    }
  }

  const fetchUser = async () => {
    console.log("fetchUser");
    if (!contract) return;
    if (!account) return;
    const res = await contract.getUser(account.address);
    console.log(res);
  }

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log("registerUser");
    if (!contract) return;
    const user = await contract.regUser(e.target[0].value);
    console.log(user);
  }

  useEffect(() => { init(); }, []);
  return (
    <div>
      <div>
        <h1>Register to continue</h1>
        <form onSubmit={registerUser}>
          <input type="text" name="name" />
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={fetchUser}> fetch user </button>
      </div>
    </div>
  );
}
