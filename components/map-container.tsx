"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "./loader";
export default function MyPage({ serverSession, closed }) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <LoadingSpinner />,
        ssr: false,
      }),
    []
  );

  return (
    <Map
      position={[-23.568150503214053, -46.64908926499208]}
      zoom={12}
      serverSession={serverSession}
      closed={closed}
    />
  );
}
