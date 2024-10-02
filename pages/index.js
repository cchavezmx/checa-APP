import dynamic from "next/dynamic";
import useSound from "use-sound";

const ChachaAPP = dynamic(() => import("./ChacadorApp"), {
  ssr: false,
});

export default function Home() {
  const [playSuccess] = useSound("/sounds/click_success.mp3");
  return (
    <div>
      <ChachaAPP playSuccess={playSuccess} />
    </div>
  );
}
