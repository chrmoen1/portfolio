import { marquee } from "../data/profile";
import { Asterisk } from "./ui";

function Row({ reverse, light }: { reverse?: boolean; light?: boolean }) {
  const items = [...marquee, ...marquee];
  return (
    <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
      {[0, 1].map((k) => (
        <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {items.map((m, i) => (
            <li key={i} className="flex items-center gap-6 px-6 font-display text-2xl font-medium whitespace-nowrap sm:text-4xl">
              {m}
              <Asterisk className={`size-5 ${light ? "text-lime" : "text-ink"}`} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Two crossing, slanted bands of scrolling text. */
export default function Marquee() {
  return (
    <div className="relative h-48 overflow-hidden sm:h-60" aria-label="Areas of focus">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-white py-4 text-ink">
        <Row reverse light />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg] bg-lime py-4 text-ink shadow-2xl">
        <Row />
      </div>
    </div>
  );
}
