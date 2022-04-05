import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useNavigate, useSearchParams } from 'react-router-dom'

const FormTemplate = () => {
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();
   
    return (
      <div className="wrapper">
          <div className="form">
                <h1 className="title">Chat Application</h1>
                {searchParams.get('form') === 'login' || !searchParams.get('form') ? <LoginForm/> : <SignUpForm/>}           
          </div>
      </div>
    )
}

export default FormTemplate