import { Navigate, useLocation } from "react-router-dom";
import AuthorLoading from "./AuthorLoading";
import { useGetAuthorDetailsQuery } from "../authorApi";

const Protected = ({ children }) => {
    const { data, isLoading } = useGetAuthorDetailsQuery();
    const location = useLocation();

    if (isLoading) {
        return <AuthorLoading />;
    }

    if (!data) {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }

    return children;
}

export default Protected;