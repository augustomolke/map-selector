import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";
import Whatsapp from "@/components/assets/whatsapp.svg";
import { Handshake } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <Handshake size={64} />
            <CardTitle className="text-2xl">Agora é com a gente!</CardTitle>
          </div>
          <CardContent className="p-0">
            <div className="flex flex-col gap-2 mt-8">
              <p>
                Suas preferências foram coletadas com sucesso, agora fique de
                olho no seu telefone cadastrado.
              </p>
              <p className="flex gap-2">
                <Image height={64} src={Whatsapp} />

                <strong>A equipe Shopee entrará em contato em breve!</strong>
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
