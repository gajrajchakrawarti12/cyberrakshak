import express from "express";
import ReportScam from "../models/ReportScam.js";
import e from "express";

const router = express.Router();
// Create a new report
router.post("/", async (req, res) => {
  try {
    const report = new ReportScam(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await ReportScam.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get a report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await ReportScam.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;