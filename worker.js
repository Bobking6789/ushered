// Ushered — Cloudflare Worker proxy for the Anthropic API.
//
// Why this exists: the browser must never hold a secret API key. This Worker
// sits between the browser and Anthropic. The key lives here as a secret
// (set with: Settings -> Variables -> Add variable -> "Encrypt"), never in
// the front-end code.
//
// Deploy: paste this into a Cloudflare Worker, add a secret named
// ANTHROPIC_API_KEY, and Deploy.

const ALLOWED_ORIGIN = "https://bobking6789.github.io";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Browsers send a "preflight" OPTIONS request first to check CORS rules.
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
    }

    // Read the prompt the browser sent us.
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    // Forward the request to Anthropic, attaching the secret key server-side.
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: body.model || "claude-sonnet-4-6",
        max_tokens: body.max_tokens || 600,
        messages: body.messages,
      }),
    });

    const data = await anthropicResponse.json();
    return json(data, anthropicResponse.status);
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
