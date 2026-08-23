import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function accountTool(customerId) {
  const filePath = path.join(
    __dirname,
    "../data/accounts.json"
  );

  const accounts = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const account = accounts.find(
    (item) => item.customerId === customerId
  );

  if (!account) {
    return {
      success: false,
      error: "Account not found"
    };
  }

  return {
    success: true,
    account
  };
}

export default accountTool;