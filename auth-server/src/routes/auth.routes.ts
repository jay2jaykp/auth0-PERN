import { Request, Response, Router } from "express";

import { Connection, ManagementClient, Organization } from "auth0";
import { auth } from "express-openid-connect";

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN || "",
  clientId: process.env.BACKEND_CLIENT_ID || "",
  clientSecret: process.env.BACKEND_CLIENT_SECRET || "",
});

export const authRoutes = Router();

authRoutes.get("/tenants", async (req: Request, res: Response) => {
  try {
    const tenants = await auth0.organizations.getAll();
    const connections = await auth0.getConnections();
    const tenantsWithConnections: (Organization & {
      connections: Connection;
    })[] = tenants.map((tenant) => {
      const tenantConnections = connections.filter(
        (connection) => connection.name === tenant.name
      );
      return {
        ...tenant,
        connections: tenantConnections[0],
      };
    });
    res.send(tenantsWithConnections);
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.routes.ts:11 ~ authRoutes.get ~ error:",
      error
    );
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});
