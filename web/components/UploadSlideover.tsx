"use client";

import { useState, useRef, useCallback, useEffect, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { extractPdfText, extractTextFromPlain, cleanAndParse } from "@/lib/pdf-parser";
import styles from "./UploadSlideover.module.css";

interface Agent {
  id: string;
  name: string;
}

interface UploadSlideoverProps {
  open: boolean;
  onClose: () => void;
}

type UploadStep = "idle" | "reading" | "uploading" | "error";

export default function UploadSlideover({ open, onClose }: UploadSlideoverProps) {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [callDate, setCallDate] = useState(new Date().toISOString().split("T")[0]);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<UploadStep>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch agents on open
  useEffect(() => {
    if (!open) return;
    fetch("/api/agents")
      .then((r) => r.json())
      .then((data) => {
        setAgents(data.agents || []);
        if (data.agents?.length && !selectedAgent) {
          setSelectedAgent(data.agents[0].id);
        }
      })
      .catch(() => {});
  }, [open, selectedAgent]);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setErrorMsg("");
    setStep("idle");
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  async function handleAnalyze() {
    if (!file || !selectedAgent) return;
    setStep("reading");
    setErrorMsg("");

    try {
      // Extract text based on file type
      let text: string;
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        text = await extractPdfText(file);
      } else {
        text = await extractTextFromPlain(file);
      }

      // Try to find JSON in the text
      const parsed = cleanAndParse(text);

      if (parsed) {
        // Pre-analyzed PDF — upload directly
        setStep("uploading");
        const res = await fetch("/api/calls/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent_id: selectedAgent,
            call_date: callDate,
            analysis: parsed,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        // Redirect to the call report
        router.push(`/report/${data.call_id}`);
        onClose();
      } else {
        // Raw transcript — would need AI analysis
        setStep("error");
        setErrorMsg(
          "No analysis JSON found in this file. Please upload a PDF containing the Certainty System analysis output."
        );
      }
    } catch (err) {
      setStep("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Could not process file. Make sure it contains valid analysis data."
      );
    }
  }

  if (!open) return null;

  const fileName = file
    ? file.name.length > 36
      ? file.name.slice(0, 33) + "..."
      : file.name
    : null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.slideover}>
        <div className={styles.soHeader}>
          <span className={styles.soTitle}>Upload Call Analysis</span>
          <button className={styles.soClose} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.soBody}>
          {/* Agent select */}
          <div className={styles.soField}>
            <label className={styles.soLabel}>Agent</label>
            <select
              className={styles.soSelect}
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className={styles.soField}>
            <label className={styles.soLabel}>Call Date</label>
            <input
              className={styles.soInput}
              type="date"
              value={callDate}
              onChange={(e) => setCallDate(e.target.value)}
            />
          </div>

          {/* Drop zone */}
          <div
            className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""} ${file ? styles.hasFile : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {file ? (
              <div className={styles.dzFile}>
                <strong>{fileName}</strong>
                <span className={styles.dzReady}>Ready to analyze</span>
              </div>
            ) : (
              <div className={styles.dzPrompt}>
                <span className={styles.dzIcon}>+</span>
                <span>Drop a PDF here or click to browse</span>
                <span className={styles.dzHint}>PDF with Certainty analysis JSON</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.json"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
          </div>

          {/* Error message */}
          {errorMsg && <p className={styles.soError}>{errorMsg}</p>}

          {/* Analyze button */}
          <button
            className={styles.analyzeBtn}
            disabled={!file || !selectedAgent || step === "reading" || step === "uploading"}
            onClick={handleAnalyze}
          >
            {step === "reading"
              ? "Reading file..."
              : step === "uploading"
                ? "Storing analysis..."
                : "Analyze Call"}
          </button>
        </div>
      </div>
    </>
  );
}
