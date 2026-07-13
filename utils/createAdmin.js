// Run this once to create your admin login: node utils/createAdmin.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const ADMIN_EMAIL = "admin@velvetbrew.com";
const ADMIN_PASSWORD = "admin123"; // change this after first login in a real deployment

const existing = await User.findOne({ email: ADMIN_EMAIL });
if (existing) {
  existing.role = "admin";
  await existing.save();
  console.log(`Existing user ${ADMIN_EMAIL} promoted to admin.`);
} else {
  await User.create({
    name: "Velvet Brew Admin",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "admin",
  });
  console.log(`Admin created — email: ${ADMIN_EMAIL}  password: ${ADMIN_PASSWORD}`);
}

process.exit();
