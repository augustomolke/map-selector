import { auth } from "@/auth"; // Import Select components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormPref } from "@/components/form-pref2";
import { getCeps } from "@/actions/submit";

const macro = ["São Paulo"];
function formatCep(input) {
  // Ensure the input is a string
  let number = input.toString();

  // Check if the number has only 7 digits
  if (number.length === 7) {
    number = "0" + number; // Append a 0 at the beginning
  }

  // Format the number as XXXXX-XXX
  return number.slice(0, 5) + "-" + number.slice(5);
}

export default async function Home() {
  const session = await auth();

  const ceps2 = await getCeps();

  const regions = [...new Set(ceps2.map((r) => r["route"]))].filter(
    (a) => a.length > 0
  );

  const macroRegions = regions.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: ceps2
        .filter((c) => c["route"] == curr)
        .map((cep) => {
          const min = formatCep(cep["zipcode_min"]);
          const max = formatCep(cep["zipcode_max"]);
          return {
            ceps: `De ${min} a ${max}`,
            zona: cep["zona"],
            cluster: cep["cluster"],
          };
        }),
    };
  }, {});

  return (
    <div className="flex justify-center">
      <Card className="mx-4">
        <CardHeader>
          <CardTitle>Preferências de Entrega</CardTitle>
        </CardHeader>

        <CardContent>
          <FormPref macroRegions={macroRegions} />
        </CardContent>
      </Card>
    </div>
  );
}
