import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInFields } from "../constants/formFields";
import Input from "./Input";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<Record<string, string>>(
        signInFields.reduce((acc, field) => {
          acc[field.name] = '';
          return acc;
        }, {} as Record<string, string>)
    );
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://192.168.1.10:89/api/login", formData);

            const token = response.data.authorization.token;

            localStorage.setItem("token", token);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
            }).then(() => {
                navigate("/dashboard");
            });
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response.data;
                setValidationErrors(responseData);
                if (responseData) {
                    setValidationErrors(responseData);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData || "Registration failed.",
                    });
                }
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex items-center">
                <div className="container max-w-md mx-auto">
                    <div className="flex-row justify-center items-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        {
                                            signInFields.map(field=>
                                                <Input
                                                    key={field.id}
                                                    handleChange={handleChange}
                                                    value={formData[field.id]}
                                                    labelText={field.labelText}
                                                    labelFor={field.labelFor}
                                                    id={field.id}
                                                    name={field.name}
                                                    type={field.type}
                                                    isRequired={field.isRequired}
                                                    placeholder={field.placeholder}
                                                />
                                            )
                                        }
                                        <div className="flex justify-center">
                                            <button type="submit" className="bg-transparent border border-purple-400 text-purple-400 py-2 px-4 rounded hover:bg-purple-400 hover:text-white transition duration-300">Submit</button>
                                        </div>
                                    </form>
                                    <p className="text-center text-wrap mt-5 mb-0">Not an account? <a href="/register" className="font-bold"><u>Register here</u></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
