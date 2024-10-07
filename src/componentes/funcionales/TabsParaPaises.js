import React, { useState } from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  const [activarTab, setActivarTab] = useState(0);

  return (
    <div className="flex justify-center space-x-2 p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`relative px-4 py-2 rounded-xl font-bold border border-teal-400 border-b-4 overflow-hidden transition-all duration-300 group ${
            activeTab === tab
              ? "bg-teal-600 text-white"
              : "bg-teal-200 text-teal-800 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75"
          }`}
          onClick={() => onTabChange(tab)}
        >
          <span className="bg-teal-400 shadow-teal-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
