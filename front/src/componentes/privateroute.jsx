const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para /login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Se houver token, renderiza o componente filho passado para PrivateRoute
    return children;
};

export default PrivateRoute;