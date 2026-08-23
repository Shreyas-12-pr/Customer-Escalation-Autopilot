import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function technicalAgent(customerId) {
  const filePath = path.join(
    __dirname,
    "../data/customers.json"
  );

  const customerData = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  if (customerData.id !== customerId) {
    return {
      success: false,
      error: "Customer not found"
    };
  }

  const account = customerData.account;

  return {
    success: true,

    technical: {
      accountStatus: account.status,
      accountLocked: account.status === "locked",
      lockReason: account.reason
    }
  };
}

export default technicalAgent;