"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopCryptoPrices = async () => {
  const response = await axios.get("https://api.coincap.io/v2/assets?limit=20");
  return response.data.data;
};

const fetchAllCryptoPrices = async () => {
  const response = await axios.get("https://api.coincap.io/v2/assets");
  return response.data.data;
};

const formatNumber = (num: number, isMobile: boolean): string => {
  if (isMobile) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  }
  return num.toLocaleString();
};

export default function CryptoDashboard() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return true;
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", () => setIsMobile(window.innerWidth <= 768));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  const { data: topData, isLoading, refetch } = useQuery({
    queryKey: ["topCryptoPrices"],
    queryFn: fetchTopCryptoPrices,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  const { data: allData } = useQuery({
    queryKey: ["allCryptoPrices"],
    queryFn: fetchAllCryptoPrices,
    refetchOnWindowFocus: false,
    enabled: search.length > 0,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#1C1C1E] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  const displayedData = search.length > 0 ? allData || [] : topData || [];
  const filteredData = displayedData?.filter((crypto: { name: string; symbol: string }) =>
    crypto.name.toLowerCase().includes(search.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={
      `${darkMode ? "bg-[#1C1C1E] text-white" : "bg-[#F8F9FA] text-black"} min-h-screen flex flex-col items-center p-6 transition-all relative`
    }>
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-center items-center mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-gray-800"}`}>Crypto Dashboard</h1>
      </div>
      <div className="flex w-full max-w-md gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 ${darkMode ? "border-gray-700 bg-[#2C2C2E] text-white focus:ring-blue-500" : "border-gray-300 bg-white text-black focus:ring-blue-400"}`}
        />
        <button
          onClick={refetch}
          className={`px-5 py-2 rounded-lg transition shadow-md flex items-center justify-center ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-800 text-white"}`}
        >
          <span className={darkMode ? "text-white" : "text-gray-300"}>🔄</span>
        </button>
      </div>
      <div className="w-full max-w-4xl overflow-x-auto rounded-lg shadow-lg">
        {filteredData?.length === 0 ? (
          <p className="text-center text-gray-400">No results found.</p>
        ) : (
          <table className={`w-full border-collapse border rounded-lg overflow-hidden text-sm ${darkMode ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}>
            <thead className={darkMode ? "bg-[#2C2C2E] text-white" : "bg-gray-100 text-black"}>
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">24h Volume</th>
                <th className="p-3">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((crypto, index) => (
                <tr key={crypto.id} className={darkMode ? "bg-[#2C2C2E] border-b border-gray-700 hover:bg-[#3A3A3C]" : "bg-white border-b border-gray-300 hover:bg-gray-200"}>
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <span className={darkMode ? "text-white font-bold" : "text-gray-900 font-bold"}>{crypto.name}</span>
                    <span className={darkMode ? "text-gray-400 text-xs" : "text-gray-600 text-xs"}>{crypto.symbol.toUpperCase()}</span>
                  </td>
                  <td className={`p-3 ${darkMode ? "text-green-400" : "text-green-700"}`}>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                  <td className={`p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{formatNumber(parseFloat(crypto.volumeUsd24Hr), isMobile)}</td>
                  <td className={`p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{formatNumber(parseFloat(crypto.marketCapUsd), isMobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 px-4 py-2 rounded-lg transition shadow-md border border-gray-700 bg-gray-800 text-white hover:bg-gray-900"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

