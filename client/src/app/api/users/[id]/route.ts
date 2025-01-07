import { NextResponse as res } from "next/server";
import { getUser } from "./services";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  console.log(params);

  try {
    const user = await getUser(params.id);
    return res.json({ user }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 500 });
  }
}
