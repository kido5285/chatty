import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './comps/ChatFeed.jsx';
import { decrypt } from 'crypto-js/aes';
import { enc } from "crypto-js/core";
import './App.css';
import FormTemplate from './comps/FormTemplate.jsx';
import Options from './comps/Options.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  if(!localStorage.getItem('username') || !localStorage.getItem('password')) return <FormTemplate />

  return (
    <ChatEngine
			height='100vh'
			userName={localStorage.getItem('username')}
			userSecret={decrypt(localStorage.getItem('password'), process.env.REACT_APP_CIPHERSEC).toString(enc.Utf8)}
			projectID={process.env.REACT_APP_PROJECTID}
      renderChatFeed={(thisprops) => <ChatFeed {...thisprops}/>}
      renderOptionsSettings={(creds, chat) => <Options creds={creds} chatID={chat.id}/>}
		/>
  );
}

export default App;
