import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TenantContext } from "../context/TenantContext";
import { api } from "../utils/axios";
import { SignUp } from "../components/SignUp";

export const Auth: React.FC = () => {
  const { user, loginWithPopup } = useAuth0();
  const { selectedTenant } = useContext(TenantContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-screen h-screen">
      <div className=" flex items-center justify-center">
        <div>
          <button
            className="btn btn-primary btn-block my-1"
            onClick={() =>
              void loginWithPopup({
                authorizationParams: {
                  connection: selectedTenant?.name,
                  organization: selectedTenant?.id,
                  redirect_uri: `${window.location.origin}/callback`,
                },
              })
            }
          >
            Login
          </button>
          <p className="text-center">OR</p>
          <SignUp />
        </div>
      </div>
    </div>
  );
};
