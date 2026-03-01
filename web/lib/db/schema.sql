-- Certainty System — Database Schema
-- SQLite via better-sqlite3

CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('agent', 'manager')),
  is_active   INTEGER NOT NULL DEFAULT 1,
  joined_date TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS calls (
  id             TEXT PRIMARY KEY,
  agent_id       TEXT NOT NULL REFERENCES users(id),
  agent_name     TEXT NOT NULL,
  call_date      TEXT NOT NULL,
  call_type      TEXT,
  classification TEXT,
  display_score  REAL,
  raw_score      REAL,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'complete', 'failed')),
  analysis_json  TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_progress (
  agent_id           TEXT PRIMARY KEY REFERENCES users(id),
  total_xp           INTEGER NOT NULL DEFAULT 0,
  current_level      INTEGER NOT NULL DEFAULT 1,
  current_level_name TEXT NOT NULL DEFAULT 'Green Light',
  avg_score_last5    REAL,
  score_trend        TEXT DEFAULT 'flat' CHECK (score_trend IN ('up', 'down', 'flat')),
  focus_categories   TEXT DEFAULT '[]',
  updated_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_badges (
  agent_id   TEXT NOT NULL REFERENCES users(id),
  category   TEXT NOT NULL,
  tier       TEXT NOT NULL DEFAULT 'Developing' CHECK (tier IN ('Developing', 'Proficient', 'Sharp')),
  score      REAL NOT NULL DEFAULT 0,
  max_score  REAL NOT NULL DEFAULT 20,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (agent_id, category)
);

CREATE TABLE IF NOT EXISTS feed_entries (
  id               TEXT PRIMARY KEY,
  agent_id         TEXT NOT NULL REFERENCES users(id),
  type             TEXT NOT NULL,
  content          TEXT NOT NULL,
  related_href     TEXT,
  is_read          INTEGER NOT NULL DEFAULT 0,
  expanded_content TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_calls_agent ON calls(agent_id);
CREATE INDEX IF NOT EXISTS idx_calls_date ON calls(call_date);
CREATE INDEX IF NOT EXISTS idx_feed_agent ON feed_entries(agent_id);
