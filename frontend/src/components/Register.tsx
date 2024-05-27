import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { signupFields } from "../constants/formFields";
import Input from "./Input";

const Register: React.FC = () => {
    const [formData, setFormData] = React.useState<Record<string, string>>(
        signupFields.reduce((acc, field) => {
          acc[field.name] = '';
          return acc;
        }, {} as Record<string, string>)
    );
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch("http://192.168.1.10:89/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            if (response.ok) {
                setValidationErrors({});
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message,
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
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
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during registration.",
            });
        }
    }

    return(
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex items-center">
                <div className="container max-w-md mx-auto">
                    <div className="flex-row justify-center items-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="" style={{borderRadius: '15px'}}>
                                <div className="p-5">
                                    <h2 className="uppercase text-center mb-5">Create an account</h2>
                                    <form className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit}>
                                        {
                                            signupFields.map(field=>
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
                                            <button type="submit" className="bg-transparent border border-purple-400 text-purple-400 py-2 px-4 rounded hover:bg-purple-400 hover:text-white transition duration-300">Register</button>
                                        </div>
                                    </form>
                                    <p className="text-center text-wrap mt-5 mb-0">Have already an account? <a href="/login" className="font-bold"><u>Login here</u></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;