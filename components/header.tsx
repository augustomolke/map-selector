import Link from "next/link";
import { Logo } from "./logo";
import { LogoutButton } from "./logout-button";
import { auth } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full  bg-foreground backdrop-blur ">
      <div className="flex h-14 max-w-screen-2xl items-center mx-6">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <Popover open>
            <PopoverTrigger></PopoverTrigger>
            <PopoverContent asChild sideOffset={48}>
              <div className="w-fit border-2 border-orange-600">
                <div id="name" className="text-primary font-bold">
                  {`Olá, ${session.user.name.split(" ")[0]}!`}
                </div>

                <div id="region" className="text-primary font-bold">
                  {session.user.region
                    ? `Região Atual: ${session.user.region}`
                    : null}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};
