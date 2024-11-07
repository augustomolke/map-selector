import Image from "next/image";
import MapComponent from "@/components/map-container";

import { SelectionDrawer } from "@/components/selection-drawer";
import { Header } from "@/components/header";
import { LoadingSpinner } from "@/components/loader";
import { auth } from "@/auth";
import { getRegions } from "@/actions/submit";

export default async function Home() {
  const session = await auth();
  const spots = await getRegions();

  return (
    <div className="h-screen fixed">
      <Header />
      <SelectionDrawer serverSession={session} />
      <MapComponent
        serverSession={session}
        closed={spots.data
          .filter((cluster) => cluster.close)
          .map((cluster) => cluster.cluster)}
      />
    </div>
  );
}
