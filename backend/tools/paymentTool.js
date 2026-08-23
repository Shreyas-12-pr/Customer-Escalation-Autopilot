import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function paymentTool(customerId) {
  const filePath = path.join(
    __dirname,
    "../data/payments.json"
  );

  const payments = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const customerPayments = payments.filter(
    (payment) => payment.customerId === customerId
  );

  const duplicatePayments = customerPayments.filter(
    (payment) => payment.status === "duplicate"
  );

  return {
    success: true,
    customerId,
    payments: customerPayments,
    duplicatePayments
  };
}

export default paymentTool;