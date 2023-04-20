import { execSync } from "child_process";

execSync("pnpm i ", { stdio: "inherit" });
execSync("cd packages/backend && pnpm prisma:init", { stdio: "inherit" });
execSync("cd packages/shared && pnpm build", { stdio: "inherit" });
