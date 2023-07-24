import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { STATICS } from "../utils/const";
import { TenantContext } from "../context/TenantContext";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth0();
  const { setSelectedTenant, selectedTenant } = useContext(TenantContext);
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <div className="text-center">
            <img
              className="w-24 mx-auto"
              src={selectedTenant?.branding.logo_url}
              alt="brand-logo"
            />
            <p className="text-sm">Powered By {STATICS.brand}</p>
          </div>
        </Link>
      </div>
      <div className="flex-none">
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
                <Link className="justify-between" to="/admin">
                  Admin
                </Link>
              </li>

              <li>
                <button
                  onClick={() =>
                    void logout({
                      logoutParams: {
                        returnTo: window.location.origin,
                      },
                    })
                  }
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
