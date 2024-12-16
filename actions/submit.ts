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

const defaultPrefs = {
  seg: "",
  ter: "",
  qua: "",
  qui: "",
  sex: "",
  sab: "",
  janela1: "",
  janela2: "",
  janela3: "",
};

export const updateTimePreferences = async (prefs) => {
  const session = await auth();

  const days = prefs.days.reduce((acc, curr) => {
    return { ...acc, [curr]: true };
  }, {});

  const shifts = prefs.shifts.reduce((acc, curr) => {
    return { ...acc, [curr]: true };
  }, {});

  const payload = { ...defaultPrefs, ...days, ...shifts };

  const body = JSON.stringify({
    method: "PUT",
    sheet: "drivers",
    key: process.env.SECRET,
    id: session?.user._id,
    payload,
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
