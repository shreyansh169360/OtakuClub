import React, { useState } from "react";
import "./styles.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0); //hold the index of the default selected tab's index in data[].
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    },300);
    onTabChange(tab, index);
  };

  
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data?.map((tab, index) => {
                return(
          <span
            key={index}
            className={`tabItem ${index === selectedTab ? "active" : ""}`}
            onClick={() => activeTab(tab , index)}
          >
            {tab}
          </span>)
        })}

        <span className="movingBg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
