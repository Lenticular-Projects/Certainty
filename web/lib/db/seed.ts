import { getDb } from "./index";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const AGENT_LEVELS: Record<number, string> = {
  1: "Green Light",
  2: "Listener",
  3: "Reader",
  4: "Builder",
  5: "Shifter",
  6: "Closer",
  7: "Architect",
  8: "Master Certified",
};

const CATEGORIES = [
  { category: "Signal Reading", max_score: 20 },
  { category: "Math Breakdown", max_score: 20 },
  { category: "Objection Handling", max_score: 15 },
  { category: "Client Gold", max_score: 15 },
  { category: "Communication", max_score: 15 },
  { category: "Close Confirmation", max_score: 15 },
];

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "agent" | "manager";
}

const SEED_USERS: SeedUser[] = [
  { name: "Morgan Reed", email: "manager@certainty.io", password: "certainty2026", role: "manager" },
  { name: "Alex Johnson", email: "alex@certainty.io", password: "agent123", role: "agent" },
  { name: "Jordan Mitchell", email: "jordan@certainty.io", password: "agent123", role: "agent" },
  { name: "Sam Park", email: "sam@certainty.io", password: "agent123", role: "agent" },
  { name: "Casey Rivera", email: "casey@certainty.io", password: "agent123", role: "agent" },
  { name: "Taylor Kim", email: "taylor@certainty.io", password: "agent123", role: "agent" },
];

export function seed() {
  const db = getDb();

  // Check if already seeded
  const existing = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (existing.count > 0) {
    console.log("Database already seeded. Skipping.");
    return;
  }

  const insertUser = db.prepare(
    "INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)"
  );
  const insertProgress = db.prepare(
    "INSERT INTO agent_progress (agent_id, current_level, current_level_name) VALUES (?, ?, ?)"
  );
  const insertBadge = db.prepare(
    "INSERT INTO agent_badges (agent_id, category, max_score) VALUES (?, ?, ?)"
  );

  const transaction = db.transaction(() => {
    for (const user of SEED_USERS) {
      const id = crypto.randomUUID();
      const hash = bcrypt.hashSync(user.password, 10);
      insertUser.run(id, user.name, user.email, hash, user.role);

      if (user.role === "agent") {
        insertProgress.run(id, 1, AGENT_LEVELS[1]);
        for (const cat of CATEGORIES) {
          insertBadge.run(id, cat.category, cat.max_score);
        }
      }
    }
  });

  transaction();
  console.log(`Seeded ${SEED_USERS.length} users.`);
}

// Run directly with: npx tsx lib/db/seed.ts
// Only auto-run when executed directly (not when imported by Next.js)
const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].endsWith("seed.ts");

if (isDirectRun) {
  seed();
}
