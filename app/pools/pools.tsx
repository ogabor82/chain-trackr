"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Pools() {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const fetchPools = async () => {
      const response = await fetch(
        //"https://moralis-playground-default-rtdb.europe-west1.firebasedatabase.app/moralis.json"
        "https://moralis-playground-default-rtdb.europe-west1.firebasedatabase.app/pools.json"
      );
      const data = await response.json();
      //console.log(Object.values(data));
      //setPools(Object.values(data));
      setPools(data);
    };

    fetchPools();
  }, []);

  return (
    <div>
      <h1>Pools</h1>

      {pools && (
        <ul>
          {Object.keys(pools).map((item: any, index) => {
            const pool: any = pools[item];
            if (pool.logs) {
              return (
                <div className="border rounded-lg border-blue-800">
                  <div key={index}>address1: {pool.logs[0].address}</div>
                  <Link href={`/pools/${item}`}>View</Link>
                </div>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
