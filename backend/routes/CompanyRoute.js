import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const companyData = new Company(req.body);
  try {
    console.log(companyData);
    
    const company = await companyData.save();
    return res.json({ message: `Company created successfully`, company });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Example protected route
router.get("/:id", async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findOne({_id : companyId});
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
    return res.json({
      message: `Welcome to the dashboard, company ${companyId}`,
      company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log("Update data:", updateData);
  console.log(`Updating company: ${id} with data:`,id, updateData);

  try {
    const company = await Company.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }

    return res.json({ message: `company ${id} updated successfully`, company });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.findOneAndDelete({ _id: id });

    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }

    return res.json({ message: `company ${id} deleted successfully`, company });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
