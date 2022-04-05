import React, { useState } from 'react';
import { deleteChat } from 'react-chat-engine';
import {LeftOutlined, DeleteOutlined, LogoutOutlined} from '@ant-design/icons'

const Options = ({creds, chatID}) => {
    const [active, setActive] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const handleClick = () => {
      setActive(!active);
    }

    const deleteThisChat = () => {
      deleteChat(creds, chatID);
    }

    const logOutAcc = () => {
      localStorage.getItem('username', '');
      localStorage.setItem('password', '');
      window.location.reload();
    }
    return (
      <div className='options' onClick={handleClick}> 
        <div className="header">Options <LeftOutlined style={{transition: 'all 700ms'}} className={active ? 'active-icons' : ''}/></div>
        <div className="content" style={{display: active ? 'flex' : 'none'}}>
          <button onClick={deleteThisChat} className="delete"><DeleteOutlined />Delete</button>
          <button onClick={logOutAcc} className="delete"><LogoutOutlined />Logout</button>
        </div>
      </div>
    )
}

export default Options