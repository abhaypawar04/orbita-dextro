import express from "express";
import {
  addContact,
  addContactpage,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  updateContactpage,
} from "../controller/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/show-contact/:id", getContact);
router.get("/add-contact", addContactpage);
router.post("/add-contact", addContact);
router.get("/update-contact/:id", updateContactpage);
router.post("/update-contact/:id", updateContact);
router.get("/delete-contact/:id", deleteContact);
export default router;
