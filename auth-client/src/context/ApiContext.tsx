// import {
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { AuthContext } from "./AuthContext";
// import axios, { AxiosInstance } from "axios";

// export const ApiContext = createContext<{
//   api: AxiosInstance | null;
// }>({
//   api: null,
// });

// export const ApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const { token } = useContext(AuthContext);
//   const [api, setApi] = useState<AxiosInstance | null>(null);

//   useEffect(() => {
//     if (!token) return;
//     setApi(
//       axios.create({
//         baseURL: "http://localhost:4000",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//     );
//   }, [token]);

//   return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
// };
