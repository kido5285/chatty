import { useState } from "react";
import {encrypt} from 'crypto-js/aes';
import {newChat} from 'react-chat-engine'
import axios from "axios";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObj = {'Private-Key': process.env.REACT_APP_PRIVATE};
        setLoading(true);
        try {
            await axios.post('https://solve-cors-problem.herokuapp.com/https://api.chatengine.io/users/', {'username': username, 'secret': password},{headers: authObj});
            localStorage.setItem('username', username);
            localStorage.setItem('password', encrypt(password, process.env.REACT_APP_CIPHERSEC).toString());
            window.location.search = '';
        } catch (error) {
            setLoading(false);
            setErr('Unable to create an account');
        }
    }   

    return (
      <form onSubmit={handleSubmit}>
            <h2 className="error" style={{marginBottom: '20px'}}>{err && err}</h2>
            <h2 className="error" style={{marginBottom: '20px'}}>{loading && 'Generating Account...'}</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Insert your username here <---" required/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="**password" required/>
            <div align="center">
                <button type="submit" className="button">
                    <span>Create an account</span>
                </button>
            </div>
            <Link style={{cursor: 'pointer', textDecoration: 'underline', fontSize: '1.4rem'}} to="/?form=login" className="error">Already have one?</Link>
        </form>
    )
}

export default SignUpForm