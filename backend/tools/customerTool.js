import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function customerTool(customerId) {
  const filePath = path.join(
    __dirname,
    "../data/customers.json"
  );

  const customers = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  if (customers.id !== customerId) {
    return {
      success: false,
      error: "Customer not found"
    };
  }

  return {
    success: true,
    customer: {
      id: customers.id,
      name: customers.name,
      email: customers.email,
      phone: customers.phone,
      plan: customers.plan,
      risk: customers.risk
    },

    tickets: customers.tickets,

    account: {
      status: customers.account.status,
      reason: customers.account.reason
    }
  };
}

export default customerTool;