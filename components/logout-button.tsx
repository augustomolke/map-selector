"use client";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "./ui/button";
import logoutAction from "@/actions/logout-action";

export const LogoutButton = () => {
  return (
    <Button
      variant={"outliner"}
      size="icon"
      onClick={async () => {
        await logoutAction();
      }}
    >
      <LogOut stroke="hsl(var(--primary))" />
    </Button>
  );
};