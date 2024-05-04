import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended((prev) => !prev)} className='menu' src={assets.menu_icon} alt="Menu icon" />

        <div className="new-chat" onClick={() => setExtended(!extended)}>
          <img src={assets.plus_icon} alt="New chat icon" /> 
          {extended && <p>New Chat</p>}
        </div>
      </div>

      {extended && (
        <div className="recent">
          <p className="recent-title">Recent</p>
          <div className="recent-entry">
            <img src={assets.message_icon} alt="Message icon" /> 
            <p>What is React...</p>
          </div>
        </div>
      )}
      
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Question icon" />
          {extended && <p className="bottom-text">Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt="History icon" />
          {extended && <p className="bottom-text">Activity</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Setting icon" />
          {extended && <p className="bottom-text">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
