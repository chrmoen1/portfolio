import { useEffect, useState } from "react";

/** Types and deletes each word in turn, like a terminal. */
export function useTyped(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0] ?? "");
      return;
    }
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((n) => n + 1);
        } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? pause : deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}
