import nodemailer from "nodemailer";
import { config } from "../config/env.js";

//email service added credentials in a .env file

export class EmailService {
  static getTransporter() {
    if (!config.email.host || !config.email.user) {
      return null;
    }

    return nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  /**
   * Send Verification OTP email.
   */
  static async sendVerificationEmail(toEmail, otp) {
    const subject = "Verify Your Student Management System Account";
    const textContent = `Your verification OTP is: ${otp}\n\nThis OTP will expire in ${config.otp.expireMinutes} minutes.`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">Student Management System</h2>
          <p style="color: #6b7280; font-size: 14px;">Account Verification</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 16px; color: #374151;">Hello,</p>
        <p style="font-size: 16px; color: #374151;">Thank you for signing up. Please use the following One-Time Password (OTP) to verify your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1d4ed8; background-color: #eff6ff; padding: 12px 24px; border-radius: 8px; border: 1px dashed #93c5fd; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #6b7280;">This OTP will expire in <strong>${config.otp.expireMinutes} minutes</strong>.</p>
        <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">If you did not request this, please ignore this email.</p>
      </div>
    `;

    return EmailService.sendMail(
      toEmail,
      subject,
      textContent,
      htmlContent,
      "Verification OTP",
      otp,
    );
  }

  /**
   * Send Password Reset OTP email.
   */
  static async sendPasswordResetEmail(toEmail, otp) {
    const subject = "Password Reset OTP - Student Management System";
    const textContent = `Your password reset OTP is: ${otp}\n\nThis OTP will expire in ${config.otp.expireMinutes} minutes.`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #dc2626; margin: 0;">Student Management System</h2>
          <p style="color: #6b7280; font-size: 14px;">Password Reset Request</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 16px; color: #374151;">Hello,</p>
        <p style="font-size: 16px; color: #374151;">We received a request to reset your password. Use the OTP below to proceed:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #b91c1c; background-color: #fef2f2; padding: 12px 24px; border-radius: 8px; border: 1px dashed #fca5a5; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #6b7280;">This OTP will expire in <strong>${config.otp.expireMinutes} minutes</strong>.</p>
        <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">If you did not request a password reset, please secure your account immediately.</p>
      </div>
    `;

    return EmailService.sendMail(
      toEmail,
      subject,
      textContent,
      htmlContent,
      "Password Reset OTP",
      otp,
    );
  }

  static async sendMail(to, subject, text, html, typeLabel, otp) {
    const transporter = EmailService.getTransporter();

    // Console logging for dev / fallback when SMTP is not configured
    console.log(
      `\n=================== [EMAIL SERVICE: ${typeLabel}] ===================`,
    );
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Expires in: ${config.otp.expireMinutes} minutes`);
    console.log(
      `========================================================================\n`,
    );

    if (!transporter) {
      console.log(
        `ℹ️ SMTP Credentials not fully configured. Logged OTP above for testing.`,
      );
      return true;
    }

    try {
      await transporter.sendMail({
        from: config.email.from,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      console.error(
        `❌ Failed to send email via SMTP to ${to}:`,
        error.message,
      );
      console.log(`ℹ️ Falling back to console OTP: ${otp}`);
      return true; // Return true so flow is not broken in local environment
    }
  }
}
