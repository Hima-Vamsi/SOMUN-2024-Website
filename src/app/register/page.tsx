"use client";

import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import React, { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "You have unsaved changes. If you leave, your form data will not be saved or restored when you return.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-screen pt-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">
          Registration Form
        </h1>
        <p className="mb-8 text-gray-300">
          For any support or queries, please email hvkatta@gmail.com or contact
          +91 9398497723
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Register;
