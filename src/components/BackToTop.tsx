import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      onClick={(e) => {
        // Scroll instead of navigating, so it also works on case-study pages
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-40 grid size-12 place-items-center rounded-full bg-sky text-white shadow-lg shadow-sky/40 transition ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5m-6 6 6-6 6 6" />
      </svg>
    </a>
  );
}
