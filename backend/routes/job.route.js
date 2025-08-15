import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjob").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);

export default router;