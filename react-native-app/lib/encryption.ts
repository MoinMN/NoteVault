// lib/encryption.ts
import * as SecureStore from "expo-secure-store";
import CryptoJS from "crypto-js";
import api from "./api";

const MASTER_KEY_STORAGE = "notevault_encryption_key";

/**
 * Fetch master key from SecureStore or backend
 */
export const getMasterKey = async (): Promise<string> => {
  let masterKey = await SecureStore.getItemAsync(MASTER_KEY_STORAGE);
  if (masterKey) return masterKey;

  // Fetch from backend
  const token = await SecureStore.getItemAsync("auth_token");
  if (!token) throw new Error("Not authenticated");

  const res = await api.get("/auth/master-key");
  
  if (!res.data.masterKey) throw new Error("Failed to fetch master key");
  masterKey = res.data.masterKey as string;

  await SecureStore.setItemAsync(MASTER_KEY_STORAGE, masterKey);
  return masterKey;
};

/**
 * Pad master key to 32 bytes for AES-256
 */
const formatKey = (masterKey: string) => {
  return CryptoJS.enc.Utf8.parse(masterKey.padEnd(32, "0"));
};

/**
 * Fixed IV (16 bytes) to avoid native crypto random error
 */
const FIXED_IV = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

/**
 * Encrypt data with master key
 */
export const encryptData = async (data: string): Promise<string> => {
  try {
    const masterKey = await getMasterKey();
    const key = formatKey(masterKey);

    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: FIXED_IV }).toString();
    return encrypted;
  } catch (err: any) {
    console.error("Encrypt Error:", err);
    throw { message: "Encryption failed: " + (err.message || String(err)) };
  }
};

/**
 * Decrypt data with master key
 */
export const decryptData = async (encrypted: string): Promise<string> => {
  try {
    const masterKey = await getMasterKey();
    const key = formatKey(masterKey);

    const bytes = CryptoJS.AES.decrypt(encrypted, key, { iv: FIXED_IV });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (err: any) {
    console.error("Decrypt Error:", err);
    throw { message: "Decryption failed: " + (err.message || String(err)) };
  }
};

/**
 * Clear master key from local storage
 */
export const clearMasterKey = async () => {
  await SecureStore.deleteItemAsync(MASTER_KEY_STORAGE);
};
