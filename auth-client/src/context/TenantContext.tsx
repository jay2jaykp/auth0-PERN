import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

type Tenant = {
  id: string;
  name: string;
  display_name?: string;
  branding: {
    colors: {
      page_background: string;
      primary: string;
    };
    logo_url: string;
  };
  connection: {
    id: string;
    name: string;
  };
};

export const TenantContext = createContext<{
  selectedTenant: Tenant | null;
  setSelectedTenant: (tenant: Tenant) => void;
}>({
  selectedTenant: null,
  setSelectedTenant: () => {
    console.log("not defined yet");
  },
});

export const TenantProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const getTenantInfo = async () => {
    const subDomain = window.location.hostname.split(".")[0];
    const data = await api.get(`/auth/tenant/${subDomain}`);
    console.log(data);
    setSelectedTenant(data.data as Tenant);
  };

  useEffect(() => {
    void getTenantInfo();
  }, []);

  useEffect(() => {
    if (selectedTenant) {
      localStorage.setItem("selectedTenant", JSON.stringify(selectedTenant));
    }
  }, [selectedTenant]);

  //   useEffect(() => {
  //     const selectedTenant = localStorage.getItem("selectedTenant");
  //     if (selectedTenant && allTenants.length > 0) {
  //       const selectedTenantFromLocalStorage = JSON.parse(
  //         selectedTenant
  //       ) as Tenant;
  //       if (
  //         allTenants.some(
  //           (tenant) => tenant.id === selectedTenantFromLocalStorage.id
  //         )
  //       ) {
  //         setSelectedTenant(selectedTenantFromLocalStorage);
  //       } else {
  //         setSelectedTenant(allTenants[0]);
  //       }
  //     }
  //   }, [allTenants.length]);

  return (
    <TenantContext.Provider value={{ selectedTenant, setSelectedTenant }}>
      {children}
    </TenantContext.Provider>
  );
};
