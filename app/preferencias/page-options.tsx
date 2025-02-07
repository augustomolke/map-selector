import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { auth } from "@/auth"; // Import Select components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckboxReactHookFormMultiple } from "@/components/form-pref";

const keysDays = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
const keyShifts = ["janela1", "janela2", "janela3"];
export default async function Home() {
  const session = await auth();
  const values = Object.entries(session.user).filter((v) => v[1] === true);

  const defaultValues = {
    days: [...values.filter((v) => keysDays.includes(v[0])).map((v) => v[0])],
    shifts: [
      ...values.filter((v) => keyShifts.includes(v[0])).map((v) => v[0]),
    ],
  };

  return (
    <div className="flex justify-center">
      <Card className="mx-4">
        <CardHeader>
          <CardTitle>
            Primeiro, nos diga os dias e horários que prefere entregar
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CheckboxReactHookFormMultiple defaultValues={defaultValues} />
        </CardContent>
      </Card>
    </div>
  );
}
