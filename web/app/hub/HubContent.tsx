"use client";

import { useState, useRef, useCallback } from "react";
import {
  TOPICS,
  CALL_TYPE_DATA,
  OVERVIEW_CARDS,
  ALL_ITEMS,
} from "@/lib/knowledge-data";
import type { TileData, CallTypeDetail } from "@/lib/knowledge-data";
import styles from "./page.module.css";

type ViewMode = "overview" | "topic" | "search";

const TOPIC_KEYS = [
  { key: "overview", label: "Overview" },
  { key: "calltypes", label: "The Nine Caller Types" },
  { key: "objections", label: "Objections" },
  { key: "signals", label: "Three Signals" },
  { key: "pillars", label: "Four Pillars" },
  { key: "math", label: "Math Breakdown" },
  { key: "close", label: "Close Confirmation" },
  { key: "patterns", label: "Nine Patterns" },
  { key: "storybank", label: "Story Bank" },
];

export default function HubContent() {
  const [activeTopic, setActiveTopic] = useState("overview");
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const [detailTopic, setDetailTopic] = useState("");
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchTopic = useCallback((key: string) => {
    setActiveTopic(key);
    setDetailOpen(false);
    setSearchQuery("");
    if (key === "overview") {
      setViewMode("overview");
    } else {
      setViewMode("topic");
    }
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (!q.trim()) {
      setViewMode(activeTopic === "overview" ? "overview" : "topic");
      return;
    }
    searchTimerRef.current = setTimeout(() => {
      setViewMode("search");
    }, 300);
  }, [activeTopic]);

  const openDetail = useCallback((title: string, topicKey: string) => {
    setDetailTitle(title);
    setDetailTopic(topicKey);
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
  }, []);

  // Search results
  const searchResults = searchQuery.trim()
    ? ALL_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Current tiles
  const currentTiles = TOPICS[activeTopic]?.tiles || [];
  const currentSubtitle = TOPICS[activeTopic]?.subtitle || "";

  // Detail content
  const callTypeDetail: CallTypeDetail | null =
    detailTopic === "calltypes" ? CALL_TYPE_DATA[detailTitle] || null : null;
  const tileDetail = detailTopic && TOPICS[detailTopic]
    ? TOPICS[detailTopic].tiles.find((t) => t.title === detailTitle)
    : null;

  return (
    <>
      {/* Col 2 — Topic nav */}
      <div className={styles.colPanel}>
        <p className={styles.panelEyebrow}>Topics</p>
        <div className={styles.topicList}>
          {TOPIC_KEYS.map((t) => (
            <div
              key={t.key}
              className={`${styles.topicItem} ${activeTopic === t.key ? styles.active : ""}`}
              onClick={() => switchTopic(t.key)}
            >
              <span className={styles.topicName}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3 — Main */}
      <div className={styles.colMain}>
        <div className={styles.mainHeader}>
          <span className={styles.mhTitle}>Knowledge Hub</span>
          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              placeholder="Search the System"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* Overview */}
          {viewMode === "overview" && (
            <div className={styles.overviewGrid}>
              {OVERVIEW_CARDS.map((card) => (
                <div
                  key={card.topic}
                  className={styles.overviewCard}
                  onClick={() => switchTopic(card.topic)}
                >
                  <span className={styles.ocCount}>{card.count}</span>
                  <h3 className={styles.ocTitle}>{card.title}</h3>
                  <p className={styles.ocDesc}>{card.desc}</p>
                  <span className={styles.ocCta}>Open →</span>
                </div>
              ))}
            </div>
          )}

          {/* Topic view */}
          {viewMode === "topic" && (
            <>
              <p className={styles.topicSubtitle}>{currentSubtitle}</p>
              {currentTiles.length > 0 ? (
                <div className={styles.tileGrid}>
                  {currentTiles.map((tile) => (
                    <div
                      key={tile.title}
                      className={styles.tile}
                      onClick={() => openDetail(tile.title, activeTopic)}
                    >
                      <div className={`${styles.signalPill} ${styles[tile.signal]}`}>
                        {tile.signal.charAt(0).toUpperCase() + tile.signal.slice(1)} Signal
                      </div>
                      <div className={styles.tileBody}>
                        <h3 className={styles.tileName}>{tile.title}</h3>
                        <p className={styles.tileSummary}>{tile.summary}</p>
                        <span className={styles.tileStudied}>{tile.studied}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.comingSoon}>
                  Content for this topic is coming soon.
                </p>
              )}
            </>
          )}

          {/* Search results */}
          {viewMode === "search" && (
            <div className={styles.searchResults}>
              <p className={styles.srEyebrow}>
                {searchResults.length > 0
                  ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`
                  : `No results for "${searchQuery}"`}
              </p>
              {searchResults.map((item) => (
                <div
                  key={`${item.topic}-${item.title}`}
                  className={styles.srItem}
                  onClick={() => {
                    setActiveTopic(item.topic);
                    setViewMode("topic");
                    setSearchQuery("");
                    openDetail(item.title, item.topic);
                  }}
                >
                  <span className={`${styles.srPill} ${styles[item.signal]}`}>
                    {item.signal.charAt(0).toUpperCase() + item.signal.slice(1)}
                  </span>
                  <div>
                    <div className={styles.srName}>{item.title}</div>
                    <div className={styles.srDesc}>{item.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel Overlay */}
      {detailOpen && (
        <>
          <div className={styles.detailOverlay} onClick={closeDetail} />
          <div className={styles.detailPanel}>
            <div className={styles.dpHeader}>
              <div className={styles.dpHeaderLeft}>
                {(callTypeDetail || tileDetail) && (
                  <span
                    className={`${styles.dpSignal} ${
                      styles[callTypeDetail?.signal || tileDetail?.signal || "green"]
                    }`}
                  >
                    {callTypeDetail?.signalLabel ||
                      (tileDetail
                        ? tileDetail.signal.charAt(0).toUpperCase() +
                          tileDetail.signal.slice(1) +
                          " Signal"
                        : "")}
                  </span>
                )}
                <h2 className={styles.dpTitle}>{detailTitle}</h2>
              </div>
              <button className={styles.dpClose} onClick={closeDetail}>
                &times;
              </button>
            </div>

            <div className={styles.dpBody}>
              {callTypeDetail ? (
                <>
                  <div className={styles.dpSection}>
                    <span className={styles.dpSectionLabel}>What this is</span>
                    <p className={styles.dpDefinition}>{callTypeDetail.definition}</p>
                  </div>
                  <div className={styles.dpSection}>
                    <span className={styles.dpSectionLabel}>How to recognize it</span>
                    <ul className={styles.dpCues}>
                      {callTypeDetail.recognition.map((r) => (
                        <li key={r} className={styles.dpCue}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.dpSection}>
                    <span className={styles.dpSectionLabel}>Your primary move</span>
                    <div className={styles.dpPrimaryMove}>
                      <span className={styles.dpPmLabel}>The Move</span>
                      <p className={styles.dpPmText}>{callTypeDetail.primaryMove}</p>
                    </div>
                  </div>
                  <div className={styles.dpSection}>
                    <span className={styles.dpSectionLabel}>What to avoid</span>
                    <p className={styles.dpAvoid}>{callTypeDetail.avoid}</p>
                  </div>
                </>
              ) : (
                <div className={styles.dpComingSoon}>
                  <span className={styles.dpComingSoonLabel}>Full Guide</span>
                  <h3 className={styles.dpComingSoonTitle}>{detailTitle}</h3>
                  <p className={styles.dpComingSoonBody}>
                    {tileDetail?.summary || "Detailed coaching content for this topic is in development."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
