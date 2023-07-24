import axios from "axios";
import { useContext, useState } from "react";
import { TenantContext } from "../context/TenantContext";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationContext } from "../context/NotificationContext";

export const SignUp: React.FC = () => {
  const { selectedTenant } = useContext(TenantContext);
  const { pushNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSignUp = async () => {
    const res = await axios.post(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/signup`,
      {
        email,
        password,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        connection: selectedTenant?.name,
        given_name: firstName,
        family_name: lastName,
        user_metadata: {
          phone,
        },
      }
    );
    if (res.status === 200) {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");

      pushNotification({
        message: "Successfully created account",
        type: "success",
      });
      pushNotification({
        message: "Please log in",
        type: "success",
      });
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="form-control w-full max-w-xs mt-4">
        <p className="text-2xl text-center my-4">Create new account</p>
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          type="name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          type="name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="name"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="1234567890"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Strong Password"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="btn btn-primary my-2"
          onClick={() => void handleSignUp()}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
