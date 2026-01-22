import { Navigate, useLocation } from "react-router-dom";
import ClientLoading from "../ClientLoading";
import { useGetUserQuery } from "./authApi";

const Protected = ({ children }) => {
    const { data, isLoading } = useGetUserQuery();
    const location = useLocation();
    
    if (isLoading) {
        return <ClientLoading />;
    }

    if (!data) {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }

    return children;
}

export default Protected;