import express from "express";
import multer from "multer";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// POST /api/ml/score-resume
router.post("/score-resume", upload.single("resume"), async (req, res) => {
  try {
    const { jobText } = req.body;
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "No resume uploaded." });
    }

    // Define paths
    const resumePath = path.resolve(req.file.path);
    const scriptPath = path.resolve("ml/train_skill_matcher.py");

    // Run Python model
    const process = execFile(
      "python",
      [scriptPath, resumePath, jobText],
      { maxBuffer: 1024 * 1024 * 10 },
      (error, stdout, stderr) => {
        // Cleanup uploaded file
        fs.unlinkSync(resumePath);

        if (error) {
          console.error("Python error:", error);
          console.error("stderr:", stderr);
          return res.status(500).json({ status: "error", message: "Model execution failed" });
        }

        try {
          const lines = stdout.trim().split("\n");
          const scoreLine = lines.find((line) => line.startsWith("Score:"));
          const matchedLine = lines.find((line) => line.startsWith("Matched:"));
          const missingLine = lines.find((line) => line.startsWith("Missing:"));

          const score = scoreLine ? parseFloat(scoreLine.split(":")[1]) : 0;
          const matched = matchedLine
            ? matchedLine
                .replace("Matched:", "")
                .replace(/\[|\]|'/g, "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];
          const missing = missingLine
            ? missingLine
                .replace("Missing:", "")
                .replace(/\[|\]|'/g, "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

          return res.json({
            status: "success",
            result: {
              score,
              matched_keywords: matched,
              missing_keywords: missing,
            },
          });
        } catch (err) {
          console.error("Parse error:", err);
          return res.status(500).json({ status: "error", message: "Failed to parse model output" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
