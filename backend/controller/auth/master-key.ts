import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";
import CryptoJS from "crypto-js";

const GetMasterKey = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ success: false, msg: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user || !user.encryptedMasterKey)
      return res.status(404).json({ success: false, msg: "Master key not found" });

    // Decrypt master key using server secret
    const bytes = CryptoJS.AES.decrypt(user.encryptedMasterKey, process.env.SERVER_ENCRYPTION_KEY as string);
    const masterKey = bytes.toString(CryptoJS.enc.Utf8);

    return res.status(200).json({ success: true, masterKey });
  } catch (error) {
    console.error("Get Master Key Error:", error);
    return res.status(500).json({ success: false, msg: "Failed to retrieve master key" });
  }
};

export default GetMasterKey;
