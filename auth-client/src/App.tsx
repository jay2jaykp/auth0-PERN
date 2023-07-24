import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./components/SignUp";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { Admin } from "./pages/Admin";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <div
              className="w-screen h-screen flex flex-col"
              data-theme="cupcake"
            >
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="auth" element={<Auth />} />
                  {/* <Route path="signup" element={<SignUp />} /> */}
                  <Route element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route element={<ProtectedAdminRoute />}>
                      <Route path="admin" element={<Admin />} />
                    </Route>
                  </Route>
                  <Route path="/callback" element={<h2>Hello Callback</h2>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
