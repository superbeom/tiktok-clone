import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import client from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) return res.status(200).json(null);

    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === "PUT") {
    const { userId, comment }: { userId: string; comment: string } = req.body;
    const { id } = req.query;

    if (typeof id !== "string") return res.status(200).json(null);

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuid(),
          comment,
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}
