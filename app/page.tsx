import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import deliveryMan from "@/components/assets/package-on-the-way.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-center align-center">
      <Card className="mx-4">
        <CardHeader>
          <div className="">
            <CardTitle className="text-2xl ">
              Você foi selecionado para uma missão especial!
            </CardTitle>
            <Image src={deliveryMan} />
          </div>
        </CardHeader>

        <CardContent>
          <p>
            A Shopee está iniciando um{" "}
            <strong>novo projeto para início imediato</strong> e com
            possibilidade de <strong>ganhos mais altos 🤑🤑</strong>.
          </p>

          <p className="mt-8">
            <strong>
              O carregamento será no nosso HUB da LAPA e você poderá:
            </strong>
          </p>

          <div className="bg-primary text-primary-foreground  px-6 py-6 rounded-lg my-4">
            <ul className="list-disc flex flex-col gap-8 px-6">
              <li>
                Selecionar a <strong>região de entrega</strong>
              </li>
              <li>
                Selecionar <strong>dia da semana</strong> (de segunda a sábado)
              </li>

              <li>
                Selecionar <strong>horários de entrada</strong> (temos 3
                janelas)
              </li>
            </ul>

            <Button className="bg-primary-foreground text-primary rounded-lg my-2 p-4 mt-4">
              <Link
                href="https://shopee.com.br/m/entrega-rapida-shopee"
                target="_blank"
              >
                <strong>Confira nossa página oficial</strong>
              </Link>
            </Button>
          </div>

          <p>
            <strong>
              E aí pronto para faturar com as entregas da Shopee? 📦🧡🤑
            </strong>
          </p>
        </CardContent>

        <CardFooter className="flex  flex-col items-center justify-center">
          <Button size={"lg"} className="text-xl">
            <Link href="/login">
              <strong>Quero participar!</strong>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
