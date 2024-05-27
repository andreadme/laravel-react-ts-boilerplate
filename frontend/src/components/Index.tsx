import React from "react";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
    return (
        <div className="container">
            <div className="flex-end align-center p-[10px]">
                <Link to="/login" className="text-xl pr-5 pl-5">Login</Link>
                <Link to="/register" className="text-xl pr-5 pl-5">Register</Link>
            </div>
            
            <div className="text-7xl justify-center align-center">Welcome To Home Page</div>
        </div>
    );
};

export default Index;