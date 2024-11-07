"use server";
import { auth } from "@/auth";

const api_url = process.env.GSHEET_API_URL;
const secret = process.env.SECRET;

export const updatePreferences = async (region) => {
  const session = await auth();

  const body = JSON.stringify({
    method: "PUT",
    sheet: "drivers",
    key: process.env.SECRET,
    id: session?.user._id,
    payload: { region },
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  const pref = await result.json();
};

export const getRegions = async () => {
  const session = await auth();

  const body = JSON.stringify({
    method: "GET",
    sheet: "regions",
    key: process.env.SECRET,
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  return await result.json();
};
