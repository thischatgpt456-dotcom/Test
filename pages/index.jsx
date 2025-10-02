import dynamic from "next/dynamic";
const FutureMDAcademySite = dynamic(() => import("@/components/FutureMDAcademySite.jsx"), { ssr: false });

export default function Home() {
  return <FutureMDAcademySite />;
}
