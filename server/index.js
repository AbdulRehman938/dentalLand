import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

// ─── Configure SendGrid ─────────────────────────────────────────
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ─── POST /api/send-email ───────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, date, time, service, comment } = req.body;

  // Basic validation
  if (!name || !email || !phone || !date || !time || !service) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
  }

  // Service label map
  const serviceLabels = {
    implants: 'Dental Implants',
    veneers: 'Dental Veneers',
    prosthetics: 'Dental Prosthetics',
    whitening: 'Teeth Whitening',
    hygiene: 'Dental Hygiene',
  };

  const serviceLabel = serviceLabels[service] || service;

  // Email to the clinic (booking notification)
  const clinicEmail = {
    to: process.env.SENDGRID_TO_EMAIL || 'hello@dentalland.com',
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@dentalland.com',
    subject: `New Consultation Booking — ${serviceLabel}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #5B7A12 0%, #4a630e 100%); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Booking Request</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">A new consultation has been requested</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px;"><a href="mailto:${email}" style="color: #5B7A12; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px;"><a href="tel:${phone}" style="color: #5B7A12; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600;">Time</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #9ca3af; font-size: 13px; font-weight: 600;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1a1a1a; font-size: 15px; font-weight: 600;">${serviceLabel}</td>
            </tr>
            ${comment ? `
            <tr>
              <td style="padding: 12px 0; color: #9ca3af; font-size: 13px; font-weight: 600; vertical-align: top;">Comment</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px;">${comment}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        <div style="background: #f9fafb; padding: 20px 32px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Dental Land Booking System</p>
        </div>
      </div>
    `,
  };

  // Confirmation email to the patient
  const patientEmail = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@dentalland.com',
    subject: `Booking Confirmed — Dental Land`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #5B7A12 0%, #4a630e 100%); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Booking Confirmed ✓</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Thank you for choosing Dental Land</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
            Hi <strong>${name}</strong>,<br/><br/>
            Your consultation for <strong>${serviceLabel}</strong> has been received. Our team will get back to you within 24 hours to confirm the appointment.
          </p>
          <div style="background: #F0F5E4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 8px; color: #5B7A12; font-weight: 700; font-size: 14px;">Appointment Details</p>
            <p style="margin: 0; color: #374151; font-size: 14px;">
              📅 <strong>${date}</strong> at <strong>${time}</strong><br/>
              🦷 ${serviceLabel}
            </p>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin: 20px 0 0;">
            If you have any questions, feel free to call us at <a href="tel:+923087448630" style="color: #5B7A12;">+92 308 7448630</a> or reply to this email.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 20px 32px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Dental Land — Building 15, Dubai Internet City, Dubai, UAE</p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      sgMail.send(clinicEmail),
      sgMail.send(patientEmail),
    ]);

    console.log(`✅ Booking email sent for ${name} (${email})`);
    res.json({ success: true, message: 'Booking confirmation sent!' });
  } catch (error) {
    console.error('❌ SendGrid Error:', error?.response?.body || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again.',
    });
  }
});

// ─── Health check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Dental Land API server running on http://localhost:${PORT}`);
});
