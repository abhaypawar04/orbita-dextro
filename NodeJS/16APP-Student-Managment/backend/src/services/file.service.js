import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { config } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export class FileService {
  static async saveProfilePicture(file) {
    try {
      if (!file) return null;

      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), config.fileUpload.uploadDir);
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      // Move file to uploads directory
      await fs.rename(file.path, filePath);

      return {
        url: `/uploads/${fileName}`,
        publicId: fileName,
      };
    } catch (error) {
      throw new ApiError(500, `Failed to save file: ${error.message}`);
    }
  }

  static async deleteProfilePicture(publicId) {
    try {
      if (!publicId) return false;

      const filePath = path.join(
        process.cwd(),
        config.fileUpload.uploadDir,
        publicId,
      );

      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        return true;
      } catch (error) {
        // File doesn't exist, ignore
        return false;
      }
    } catch (error) {
      console.error(`Failed to delete file: ${error.message}`);
      return false;
    }
  }

  static async replaceProfilePicture(oldPublicId, newFile) {
    // Delete old file
    if (oldPublicId) {
      await this.deleteProfilePicture(oldPublicId);
    }

    // Save new file
    return await this.saveProfilePicture(newFile);
  }
}
