import { useState } from "react";
import {encrypt} from 'crypto-js/aes';
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObj = {'project-ID': process.env.REACT_APP_PROJECTID, 'User-Name': username, 'User-Secret': password};
        setLoading(true);
        try {
            await axios.get('https://solve-cors-problem.herokuapp.com/https://api.chatengine.io/chats', {headers: authObj});
            localStorage.setItem('username', username);
            localStorage.setItem('password', encrypt(password, process.env.REACT_APP_CIPHERSEC).toString());
            window.location.search = '';
        } catch (error) {
            setLoading(false);
            setErr('Incorrect credentials');
        }
    }   

    return (
      <form onSubmit={handleSubmit}>
          <h2 className="error" style={{marginBottom: '20px'}}>{err && err}</h2>
          <h2 className="error" style={{marginBottom: '20px'}}>{loading && 'logging in...'}</h2>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Insert your username here <---" required/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="**password" required/>
          <div align="center">
              <button type="submit" className="button">
                  <span>Start Chatting</span>
              </button>
          </div>
          <Link style={{cursor: 'pointer', textDecoration: 'underline', fontSize: '1.4rem'}} to="/?form=signup" className="error">Don't have an account?</Link>
      </form>
    )
}

export default LoginForm