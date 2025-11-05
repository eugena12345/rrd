import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function PrivateRoute({ children }) {
    const auth = useAuthContext();
    const location = useLocation();
    if (auth.user === null) {
        return (
            <Navigate to='/login' state={{ from: location.pathname }} replace />
        )
    }

    return children;

};