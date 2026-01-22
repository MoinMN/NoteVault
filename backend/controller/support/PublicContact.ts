import Contact from "../../model/support.model.js";
import { Request, Response } from "express";
import sendContactMail from "../../utils/sendContactMail.js";

const CreateContact = async (req: Request, res: Response) => {
  try {
    // Get user data from request body for non-authenticated users
    const { name, email, subject, message, type, timestamp } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({ success: false, msg: "Message is required!" });
    }

    if (!email) {
      return res.status(400).json({ success: false, msg: "Email is required!" });
    }

    if (!name) {
      return res.status(400).json({ success: false, msg: "Name is required!" });
    }

    // Save contact to database
    const savedContact = await Contact.create({
      message,
      subject: subject || "No Subject",
      type: type || "other",
      userId: null, // Optional - null if not authenticated
    });

    if (!savedContact) {
      return res.status(400).json({
        success: false,
        msg: "There was an error while saving. Please try again later!"
      });
    }

    // Send email to developer
    sendContactMail({
      subject: subject || "No Subject",
      message,
      userEmail: email,
      userName: name,
      type: type || "general"
    });

    return res.status(201).json({
      success: true,
      msg: "Message sent successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error"
    });
  }
}

export default CreateContact;