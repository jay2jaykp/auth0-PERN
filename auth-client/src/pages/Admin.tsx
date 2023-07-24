/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationContext } from "../context/NotificationContext";

export const Admin: React.FC = () => {
  const { user } = useAuth0();
  const { token } = useContext(AuthContext);
  const { pushNotification } = useContext(NotificationContext);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [invitations, setInvitations] = useState<any[]>([]); // [
  const [allUsers, setAllUsers] = useState<any[]>([]); // [

  const getInvitations = async () => {
    const data = await api.post(
      "/admin/invitations",
      {},
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );

    if (data.status === 200) {
      setInvitations(data.data as any[]);
    }
  };
  const getAllUsers = async () => {
    const data = await api.post(
      "/admin/users",
      {},
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );
    if (data.status === 200) {
      setAllUsers(data.data as any[]);
    }
  };

  const sendInvite = async () => {
    const invite = await api.post(
      "/admin/invite",
      {
        invitee_email: inviteEmail,
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );
    if (invite.status === 200) {
      setInviteEmail("");
      pushNotification({
        message: `Invite sent to ${inviteEmail}`,
        type: "success",
      });
      void getInvitations();
    }
  };

  useEffect(() => {
    void getAllUsers();
    void getInvitations();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Admin Page</h1>
      <div className="w-full h-full flex mt-10 justify-center">
        <div>
          <h2>List of All users</h2>
          {allUsers.map((eachUser, index) => (
            <div key={eachUser.user_id}>
              <p>
                {index + 1}. {eachUser.email}{" "}
                {user?.sub === eachUser.user_id && "(You)"}
              </p>
            </div>
          ))}
          {invitations.length > 0 && (
            <div>
              <h2>List of All Invitations</h2>
              {invitations.map((eachInvitation, index) => (
                <div key={eachInvitation.id}>
                  <p>
                    {index + 1}. {eachInvitation.invitee.email}{" "}
                    <a
                      href={`${import.meta.env.VITE_AUTH0_DOMAIN}/authorize${
                        eachInvitation.invitation_url.split("auth")[1]
                      }&client_id=${
                        import.meta.env.VITE_AUTH0_CLIENT_ID
                      }&response_type=code`}
                    >
                      Invite Link
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
          <div>
            <label className="label">Invite Users</label>
            <input
              className="input input-primary"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => void sendInvite()}
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
