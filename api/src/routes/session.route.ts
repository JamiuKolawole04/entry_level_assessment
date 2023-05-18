import express from "express";

import { sessions } from "../controllers/session.controller";
const router = express.Router();

router.get("/", sessions);

export default router;
