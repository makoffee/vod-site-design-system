// Demo account for the /account routes (the production test account's member id). Storybook shows a placeholder.

import type { AccountProfile } from "@/screens/AccountScreen";

export const demoAccount: AccountProfile = {
  email: "name@example.com",
  name: "Jane Doe",
  memberId: "338408f2-1011-702e-8f8d-acc226671ba2",
  loginMethod: "Email",
  location: "DE",
};
