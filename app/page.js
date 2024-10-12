"use client";

import InstallPWA from "@/component/InstallPWA";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios("https://jsonplaceholder.typicode.com/todos");
    const item_data = [];
    res?.data.slice(0, 10).map((item) => {
      item_data.push(item);
    });
    setData(item_data);
  }

  
  useEffect(() => {
    getData();  
  }, []);
  
  console.log(data);

  return (
    <>
      <InstallPWA />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <ul>
          {data.map((item) => (
            <li key={item.id} className="text-lg list-decimal">{item.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
