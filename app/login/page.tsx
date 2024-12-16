import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <SignIn />
    </main>
  );
}
