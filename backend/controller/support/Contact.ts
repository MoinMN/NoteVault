import { AuthRequest } from "../../middleware/auth.middleware.js";
import Contact from "../../model/support.model.js";
import { Response } from "express";
import sendContactMail from "../../utils/sendContactMail.js";

const CreateContact = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { subject, message, type } = req.body;
    if (!message || !type) {
      return res.status(400).json({ success: false, msg: "Please fill all required fields!" });
    }

    const savedContact = await Contact.create({ message, subject, type, userId: currUser.userId });

    if (!savedContact)
      return res.status(400).json({
        success: false,
        msg: "There was error while saving. Plase try again later!"
      });

    // Send email to developer
    sendContactMail({
      subject: subject || "No Subject",
      message,
      userEmail: currUser?.email,
      userName: currUser?.name || "User",
      type
    });

    return res.status(201).json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default CreateContact;