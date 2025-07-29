// routes/apiRoute.js
import express from "express";
import userRoute from "./userRoute.js";
import verificationRoute from "./verificationRoute.js";
// import fileRoute from "./fileRoute.js";

const router = express.Router();

// Example protected route
router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

router.use("/users", userRoute);
router.use("/verification", verificationRoute); // Assuming email verification is handled in userRoute
// router.use("/files", fileRoute);

export default router;
