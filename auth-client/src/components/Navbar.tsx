import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { STATICS } from "../utils/const";
import { TenantContext } from "../context/TenantContext";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth0();
  const { allTenants, setSelectedTenant, selectedTenant } =
    useContext(TenantContext);
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          {STATICS.brand}
        </Link>
      </div>
      <div className="flex-none">
        {!user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              {selectedTenant?.name}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48"
            >
              {allTenants.map((tenant) => (
                <li key={tenant.id}>
                  <a
                    onClick={() => {
                      setSelectedTenant(tenant);
                    }}
                    className={`${
                      tenant.id === selectedTenant?.id
                        ? "bg-primary text-base-content"
                        : "bg-base-100 text-base-content"
                    } `}
                  >
                    {tenant.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.picture} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => void logout()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
