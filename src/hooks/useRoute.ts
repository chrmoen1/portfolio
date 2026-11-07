import { useEffect, useState } from "react";

/**
 * Tiny hash router. Case studies live at `#/work/<slug>`; any other hash
 * (e.g. `#about`) is a section anchor on the home page.
 */
export function useRoute() {
  const read = () => window.location.hash.match(/^#\/work\/([\w-]+)/)?.[1] ?? null;
  const [slug, setSlug] = useState<string | null>(read);

  useEffect(() => {
    const onHash = () => setSlug(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Coming back from a case study via a section link (#about): the section
  // didn't exist when the hash changed, so scroll to it once home renders.
  useEffect(() => {
    if (slug) return;
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith("/")) document.getElementById(id)?.scrollIntoView();
  }, [slug]);

  return slug;
}
