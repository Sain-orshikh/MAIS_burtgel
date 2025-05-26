import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendApprovalEmail(email: string, name: string) {
    const emailOptions: EmailOptions = {
      to: email,
      subject: 'Registration Approved - MAIS Registration',
      html: 
        <h1>Registration Approved</h1>
        <p>Dear \,</p>
        <p>We are pleased to inform you that your registration has been approved.</p>
        <p>You can now proceed with the next steps in the registration process.</p>
        <br/>
        <p>Best regards,</p>
        <p>MAIS Registration Team</p>
      ,
    };

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        ...emailOptions,
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendRejectionEmail(email: string, name: string, reason?: string) {
    const emailOptions: EmailOptions = {
      to: email,
      subject: 'Registration Status Update - MAIS Registration',
      html: 
        <h1>Registration Status Update</h1>
        <p>Dear \,</p>
        <p>We regret to inform you that your registration could not be approved at this time.</p>
        \
        <p>If you have any questions, please contact our support team.</p>
        <br/>
        <p>Best regards,</p>
        <p>MAIS Registration Team</p>
      ,
    };

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        ...emailOptions,
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
