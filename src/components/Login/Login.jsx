import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const Login = () => {
    const [inputValue, setInputValue] = useState('');
    const auth = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';
    const handleLogin = (event) => {
        event.preventDefault();
        const newUser = new FormData(event.currentTarget);
        auth.login(newUser.get('userName'), () => {
            navigate(from, { replace: true });
        })

    }
    return (
        <form onSubmit={handleLogin}>
            <input name="userName" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit">Войти</button>
        </form>
    )
};

export default Login