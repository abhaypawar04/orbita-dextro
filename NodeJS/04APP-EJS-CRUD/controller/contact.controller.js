import contact from "../models/contacts.model.js";

export const getContacts = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const options = { page: parseInt(page), limit: parseInt(limit) };
  // const contacts = await contact.find();
  const result = await contact.paginate({}, { options });
  res.send(result);
  //res.render("home", { contacts });
};

export const getContact = async (req, res) => {
  try {
    const contacts = await contact.findById(req.params.id);
    res.render("show-contact", { contacts });
  } catch (err) {
    res.send(`<h1>contact not found</h1>`);
  }
};

export const addContactpage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
  await contact.create(req.body);
  res.redirect("/");
};

export const updateContactpage = async (req, res) => {
  const contacts = await contact.findById(req.params.id);
  res.render("update-contact", { contacts });
};

export const updateContact = async (req, res) => {
  await contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
};

export const deleteContact = async (req, res) => {
  await contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
