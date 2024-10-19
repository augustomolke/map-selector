"use server";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async () => {
  await signOut({ redirect: false });

  redirect("/logout");
};
