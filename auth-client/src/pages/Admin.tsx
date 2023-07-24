/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { ObjectShowcase } from "../components/ObjectShowcase";
import { useAuth0 } from "@auth0/auth0-react";

export const Admin: React.FC = () => {
  const { user } = useAuth0();
  const { token } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState<any[]>([]); // [
  const getAllUsers = async () => {
    const data = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    });
    console.log("🚀 ~ file: Admin.tsx:8 ~ getAllUsers ~ data:", data.data);
    if (data.status === 200) {
      setAllUsers(data.data as any[]);
    }
  };

  const sendInvite = async () => {};

  useEffect(() => {
    void getAllUsers();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Admin Page</h1>
      <div className="w-full h-full flex mt-10 justify-center">
        <div>
          <h2>List of All users</h2>
          {allUsers.map((eachUser, index) => (
            <div key={eachUser.id}>
              <p>
                {index + 1}. {eachUser.email}{" "}
                {user?.sub === eachUser.user_id && "(You)"}
              </p>
            </div>
          ))}
          <div>
            <label className="label">Invite Users</label>
            <input className="input input-primary" type="email" />
            <button className="btn btn-primary" onClick={void sendInvite()}>
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
