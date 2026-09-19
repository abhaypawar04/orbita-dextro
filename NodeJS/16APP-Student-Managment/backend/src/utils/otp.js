import crypto from "crypto";

/**
 * Generates a secure random 6-digit numeric OTP string.
 */
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Creates a SHA-256 hash of the given OTP.
 */
export const hashOtp = (otp) => {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
};

/**
 * Compares a plain OTP with a stored hash.
 */
export const verifyOtpHash = (otp, hash) => {
  if (!otp || !hash) return false;
  const computedHash = hashOtp(otp);
  return crypto.timingSafeEqual(
    Buffer.from(computedHash, "utf8"),
    Buffer.from(hash, "utf8"),
  );
};
