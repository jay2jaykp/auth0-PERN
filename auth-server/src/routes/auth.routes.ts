import { Request, Response, Router } from "express";

import { Connection, ManagementClient, Organization } from "auth0";
import { auth0 } from "../utils/auth0";

export const authRoutes = Router();

authRoutes.get("/tenant/:name", async (req: Request, res: Response) => {
  try {
    const tenants = await auth0.organizations.getByName({
      name: req.params.name,
    });
    const connections = await auth0.getConnections();
    const tenantsWithConnections: Organization & {
      connection: Connection;
    } = {
      ...tenants,
      connection: connections.filter(
        (connection) => connection.name === tenants.name
      )[0],
    };
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
