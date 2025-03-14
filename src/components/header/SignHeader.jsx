import React, { useEffect, useState } from "react";


import Logo from "../Logo";
import DarkModeBtn from "../buttons/DarkModeBtn";

const SignHeader = () => {

  return (
    <header className="header">
      <Logo />
      <DarkModeBtn />
    </header>
  );
};

export default SignHeader;
