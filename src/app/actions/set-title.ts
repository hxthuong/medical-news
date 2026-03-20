"use server";

import { cookies } from "next/headers";

export async function setTitle(title: string) {
  const cookieStore = await cookies();

  cookieStore.set("title", title, {
    path: "/",
  });
}
