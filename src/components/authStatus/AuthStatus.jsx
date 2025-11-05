import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AuthStatus = ({ }) => {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.logout(() => {
            navigate('/');
        })
    };
    const handleLogin = () => {
        navigate('/login');
    };

    if (auth.user === null) {
        return (
            <button onClick={handleLogin}>Войти</button>
        )
    }

    return (
        <button onClick={handleLogout}>Выйти</button>
    )
};

export default AuthStatus;