import { Router } from "express";
import { auth0Api } from "../utils/axios";
import { auth0 } from "../utils/auth0";
import { authMiddleware } from "../middleware/auth.middleware";
import { userinfoMiddleware } from "../middleware/userinfo.middleware";
import { verifyUserMiddleware } from "../middleware/verifyUser.middleware";
import { adminToken } from "../middleware/adminToken.middleware";

export const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(userinfoMiddleware);
adminRoutes.use(verifyUserMiddleware);

adminRoutes.use(adminToken);

adminRoutes.post("/users", async (req, res) => {
  try {
    const { org_id } = req.body.user || (req.headers.user as any);

    const users = await auth0Api.get(
      `/api/v2/organizations/${org_id}/members`,
      {
        headers: {
          Authorization: `Bearer ${req.body.ManagementToken}`,
        },
      }
    );
    res.send(users.data);
  } catch (error) {
    console.log(
      "🚀 ~ file: admin.routes.ts:35 ~ adminRoutes.get ~ error:",
      error
    );

    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

adminRoutes.post("/invite", async (req, res) => {
  const { org_id } = req.body.user || (req.headers.user as any);
  const invite = await auth0Api.post(
    `/api/v2/organizations/${org_id}/invitations`,
    {
      inviter: { name: req.body.user.name },
      invitee: { email: req.body.invitee_email },
      client_id: "qJt1s0XMDQLSMhaOttQ5Cz7JPer1WBPW", // multi-tenant application
      connection_id: req.body.connection_id,
      // ttl_sec: "",
      // roles: ["ROLE_ID", "ROLE_ID", "ROLE_ID"],
      send_invitation_email: false,
    },
    {
      headers: {
        Authorization: `Bearer ${req.body.ManagementToken}`,
      },
    }
  );
  console.log(
    "🚀 ~ file: admin.routes.ts:63 ~ adminRoutes.post ~ invite:",
    invite
  );
  res.send("done");
});
