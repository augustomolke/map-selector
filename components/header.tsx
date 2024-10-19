import Link from "next/link";
import { Logo } from "./logo";
import { LogOut } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full  bg-foreground backdrop-blur ">
      <div className="flex h-14 max-w-screen-2xl items-center mx-6">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <div>
            {/* <CommandMenu /> */}
            <a className="logout" href="/logout">
              <LogOut stroke="hsl(var(--primary))" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
