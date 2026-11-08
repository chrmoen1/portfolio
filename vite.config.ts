import { existsSync, readFileSync } from "fs";
import type { IncomingMessage } from "http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Parse a .dev.vars file (KEY=value lines, # comments) the way wrangler does. */
function loadDevVars(file = ".dev.vars"): Record<string, string> {
  if (!existsSync(file)) return {};
  const vars: Record<string, string> = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) vars[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return vars;
}

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

/**
 * Dev only: serve POST /api/contact by running the same Cloudflare Pages Function
 * (functions/api/contact.js) inside the Vite dev server, with env from .dev.vars.
 * In production, Cloudflare runs the function itself.
 */
function pagesFunctionsDev(): Plugin {
  return {
    name: "pages-functions-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule("/functions/api/contact.js");
          const request = new Request(`http://localhost${req.originalUrl ?? "/api/contact"}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.method === "POST" ? await readBody(req) : undefined,
          });
          const handler = req.method === "POST" ? mod.onRequestPost : mod.onRequest;
          const response: Response = await handler({ request, env: loadDevVars() });
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(await response.text());
        } catch (err) {
          console.error("[pages-functions-dev]", err);
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Local function error (see terminal)." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pagesFunctionsDev()],
});
