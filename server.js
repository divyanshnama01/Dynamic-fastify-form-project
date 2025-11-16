// server.js
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

// In-memory names store
let names = [];

// Serve static files from ./public at root
await fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/", // serve at root
  decorateReply: false
});

// GET /names -> return names array
fastify.get("/names", async () => {
  return names;
});

// POST /names -> add new name
fastify.post("/names", async (request, reply) => {
  const { name } = request.body || {};
  if (!name || typeof name !== "string" || name.trim() === "") {
    return reply.code(400).send({ error: "Name is required" });
  }

  const clean = name.trim();

  // optional: prevent duplicates (case-insensitive)
  const exists = names.some(n => n.toLowerCase() === clean.toLowerCase());
  if (exists) {
    return reply.code(409).send({ error: "Name already exists" });
  }

  names.push(clean);
  return reply.code(201).send({ message: "Name added", name: clean });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info("Server listening at http://0.0.0.0:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
