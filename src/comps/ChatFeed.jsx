import MesForm from "./MesForm"
import MyMessage from "./MyMessage"
import OtherMes from "./OtherMes"
import { editChat, newChat } from "react-chat-engine";
import { useEffect } from "react";

const ChatFeed = (props) => {
    const chats = props['chats'];
    const activeChat = props['activeChat'];
    const userName = props['userName'];
    const messages = props.messages;
    const chat = chats && chats[activeChat];
    const creds = props.creds;
    if(chat){
        !chat.title ? chat.title = 'Welcome' : chat.title = chat.title;
    }
    useEffect(() => {
        if(chats && creds){
            if(Object.keys(chats).length === 0 && Object.keys(chats).length < 2){
                newChat(creds, "Welcome!");
                editChat(creds, Object.keys(chats)[0], chat);
            }
        }
    }, [chats])
    
    const renderReadReceipts = (mes, isMyMes) => {
        return chat.people.map((person, i) => person.last_read === mes.id && (
            <div key={`read_${i}`} className="read-receipt" style={{float: isMyMes ? 'right': 'left', backgroundImage: `url("${person.person.avatar}")`}}/>
        ));
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        return (keys.map((key, i) => {
            const mes = messages[key];
            const lastMesKey = i === 0 ? null : keys[i - 1];
            const isMyMes = userName === mes.sender.username;
            return (
                <div key={`msg_${i}`} style={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMes ? <MyMessage mes={mes}/> : <OtherMes mes={mes} lastMes={messages[lastMesKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMes ? '18px' : '0', marginLeft: isMyMes ? '0' : '68px'}}>
                        {renderReadReceipts(mes, isMyMes)}
                    </div>
                </div>
            )
        }))
    }

    return (
      <div className="chat-feed">
          <div className="chat-title-container">
              <div className="chat-title">{chat ? chat.title : (<h1>Loading...</h1>)}</div>
              <div className="chat-subtitle">
                  {chat && chat.people.map((person) => ` ${person.person.username}`)}
              </div>
          </div>
          {renderMessages()}
          <div style={{height: '100px'}}/>
          <div className="message-form-container">
              <MesForm {...props} chatId={activeChat}/>
          </div>
      </div>
    )
}

export default ChatFeed