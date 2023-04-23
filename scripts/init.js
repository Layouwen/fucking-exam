import { execSync } from "child_process";

execSync("pnpm i ", { stdio: "inherit" });
execSync("cd packages/shared && pnpm build", { stdio: "inherit" });
execSync("cd packages/client-frontend && pnpm i", { stdio: "inherit" });
execSync("cd packages/backend && pnpm i", { stdio: "inherit" });
execSync("cd packages/admin-frontend && pnpm i", { stdio: "inherit" });
