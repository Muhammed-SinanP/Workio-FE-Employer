import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import PasswordResetForm from "../../components/forms/PasswordResetForm";

const ResetPasswordPage = () => {
    const params = useParams();
    const resetToken = params.resetToken;

    return (
        <div className="page-div">
            <div className="inner-div mt-8 flex w-full items-center justify-center">
                <div>
                    <PasswordResetForm resetToken={resetToken} />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;