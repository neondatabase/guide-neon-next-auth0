"use server";

import { getSession } from "@auth0/nextjs-auth0/edge";
import { UserMessages } from "./db/schema";
import { db } from "./db";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createUserMessage(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const message = formData.get("message") as string;

  await db.insert(UserMessages).values({
    user_id: session.user.sub,
    message,
  });

  redirect("/");
}

export async function deleteUserMessage() {
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  await db
    .delete(UserMessages)
    .where(eq(UserMessages.user_id, session.user.sub));
  redirect("/");
}
