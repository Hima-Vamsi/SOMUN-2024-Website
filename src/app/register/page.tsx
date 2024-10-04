import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import React from "react";

const register = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <h1 className="pb-5 justify-center text-[37px] text-center items-center sm:text-[30px]">
        Registration Form
      </h1>
      <RegistrationForm />
    </div>
  );
};

export default register;
