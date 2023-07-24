import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { ObjectShowcase } from "../components/ObjectShowcase";
import { AuthContext } from "../context/AuthContext";

export const Profile: React.FC = () => {
  const { user, logout } = useAuth0();
  const { token } = useContext(AuthContext);

  if (!user) {
    return <p>Auth Failed</p>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="">
        <div className="flex justify-center">
          <div>
            <img src={user.picture} alt={user.name} className="rounded-full" />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-xl">{user.email}</p>
            <button
              className="btn btn-secondary my-1"
              onClick={() => void logout()}
            >
              Logout
            </button>
            <button
              className="btn btn-accent m-2"
              onClick={() => {
                void navigator.clipboard.writeText(token || "");
              }}
            >
              Copy Token
            </button>
          </div>
        </div>
        <ObjectShowcase data={user} />
      </div>
    </div>
  );
};
