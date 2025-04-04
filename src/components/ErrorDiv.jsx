import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorDiv = ({ info }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-brand-lightest page-div dark:bg-dark-light dark:text-dark-text">
            <div className="inner-div text-center tracking-wide">
                {info}
                <span
                    className="ml-1 cursor-pointer font-medium text-brand-dark underline dark:text-brand"
                    onClick={() => navigate("/")}
                >
                    Return to home
                </span>
            </div>
        </div>
    );
};

export default ErrorDiv;