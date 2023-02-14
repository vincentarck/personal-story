// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  // Pass the token if there is any Auth
  res.setPreviewData({});
  res.writeHead(307, { Location: "/" });
  res.end();
}
