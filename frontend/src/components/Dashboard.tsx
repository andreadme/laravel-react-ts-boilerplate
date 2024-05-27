import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface UserDetails {
    username: string;
    email: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get<UserDetails>("http://192.168.1.10:89/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "Please log in again.",
                    }).then(() => {
                        navigate("/");
                    });
                } else {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [navigate]);

    return (
        <div className="container mt-4">
            <div className="flex-row justify-center">
                <div className="">
                    <h3 className="font-bold text-9xl">Welcome To Dashboard</h3>
                    {userDetails && (
                        <div className="mb-10">
                            <p className="text-xl">Name: {userDetails.username}</p>
                            <p className="text-xl">Email: {userDetails.email}</p>
                        </div>
                    )}
                    <button className="bg-transparent border border-purple-400 text-purple-400 py-2 px-4 rounded hover:bg-purple-400 hover:text-white transition duration-300" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
