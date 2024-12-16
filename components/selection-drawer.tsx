"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { updatePreferences } from "@/actions/submit";
import { useToast } from "@/hooks/use-toast";
import { CircleX, CircleCheckBig } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SelectionDrawer = ({ serverSession }) => {
  const { selected, setSelected, closeBtn } = useStore();
  const [loading, setLoading] = React.useState();
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();

  const onSubmit = React.useCallback(async () => {
    setLoading(true);

    try {
      await updatePreferences(selected);

      await session.update({
        ...serverSession,
        user: {
          ...serverSession.user,
          region: selected,
        },
      });

      setSelected(null);
      setLoading(false);

      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Sua preferência foi salva!",
      });

      router.push("/parabens");
    } catch (err) {
      console.log(err);
      setLoading(false);

      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
    }
  }, [selected, session]);

  return (
    <Drawer
      open={!!selected}
      onClose={() => {
        closeBtn();
        setSelected(null);
      }}
    >
      {selected != "closed" ? (
        <DrawerContent className="max-w-screen-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              Gostaria de selecionar a região {selected} ?
            </DrawerTitle>
            <DrawerDescription>
              Você selecionou a região {selected} para realizar suas entregas ou
              coletas.{" "}
              <strong>
                Esta região é composta por toda a área destacada no mapa
              </strong>
              . Gostaria de confirmar?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onSubmit}>
              {loading ? (
                <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
              ) : (
                "Confirmar"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      ) : (
        <DrawerContent className="max-w-screen-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Esta região não tem mais vagas!</DrawerTitle>
            <DrawerDescription>
              Por favor, escolha outra região de preferência.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      )}
    </Drawer>
  );
};
