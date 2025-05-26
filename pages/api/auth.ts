import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pin } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (pin === process.env.ADMIN_PIN) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Invalid PIN" });
}
