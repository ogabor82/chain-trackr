"use client";

import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { useEffect, useState } from "react";

export default function PoolDetailPage(props: any) {
  const { params } = props;
  const [pool, setPool] = useState([]);

  useEffect(() => {
    const fetchPools = async () => {
      const response = await fetch(
        `https://moralis-playground-default-rtdb.europe-west1.firebasedatabase.app/pools/${params.slug}.json`
      );
      const data = await response.json();
      //console.log(Object.values(data));
      //setPools(Object.values(data));
      setPool(data);
    };

    fetchPools();
  }, []);

  return (
    <div>
      Pool Details:
      <JsonView
        data={pool}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  );
}
