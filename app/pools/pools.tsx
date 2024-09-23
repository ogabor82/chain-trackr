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
        <table>
          <thead>
            <tr>
              <th className="border border-blue-800 p-2">Symbol</th>
              <th className="border border-blue-800 p-2">Name</th>
              <th className="border border-blue-800 p-2">Time created</th>
              <th className="border border-blue-800 p-2">Total supply</th>
              <th className="border border-blue-800 p-2">Price</th>
              <th className="border border-blue-800 p-2">Price 2</th>
              <th className="border border-blue-800 p-2">Change %</th>
              <th className="border border-blue-800 p-2">
                pairTotalLiquidityUsd
              </th>
              <th className="border border-blue-800 p-2">Link</th>
            </tr>
          </thead>
          {Object.keys(pools).map((item: any, index) => {
            const pool: any = pools[item];
            if (pool.metadata) {
              return (
                <tr key={index} className="border rounded-lg border-blue-800">
                  <td className="border border-blue-800 p-2">
                    {pool.metadata[0].symbol} / {pool.metadata[1].symbol}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {pool.metadata[1].name}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {new Date(pool.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {pool.metadata[1].total_supply}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {pool.tokenPrice?.usdPrice || "N/A"}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {pool.tokenPrice2?.usdPrice || "N/A"}
                  </td>
                  <td className="border border-blue-800 p-2">
                    {(
                      ((pool.tokenPrice2?.usdPrice -
                        pool.tokenPrice?.usdPrice) /
                        pool.tokenPrice?.usdPrice) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </td>

                  <td className="border border-blue-800 p-2">
                    {pool.tokenPrice?.pairTotalLiquidityUsd}
                  </td>

                  <td className="border border-blue-800 p-2">
                    <Link href={`/pools/${item}`}>View</Link>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      )}
    </div>
  );
}
