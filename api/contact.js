import nodemailer from 'nodemailer';

// ─── In-memory Rate Limiter ────────────────────────────────────────────────
// Protects against spam: max 5 submissions per IP per 10 minutes.
// Works well for Vercel serverless (burst protection within a single instance).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const rateLimitMap = new Map(); // { ip: { count, resetAt } }

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// ─── Input validation constants ────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254; // RFC 5321 maximum
const MAX_MESSAGE_LEN = 3000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate Limiting ──────────────────────────────────────────────────────
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: `Too many requests. Please wait ${rateCheck.retryAfterSec} seconds before trying again.`,
    });
  }

  // ── Content-Type guard ────────────────────────────────────────────────
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  try {
    const { name, email, message } = req.body || {};

    // Presence checks
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Length limits
    if (name.trim().length > MAX_NAME_LEN) {
      return res.status(400).json({ error: `Name must be ${MAX_NAME_LEN} characters or fewer` });
    }
    if (email.trim().length > MAX_EMAIL_LEN) {
      return res.status(400).json({ error: 'Email address is too long' });
    }
    if (message.trim().length > MAX_MESSAGE_LEN) {
      return res.status(400).json({ error: `Message must be ${MAX_MESSAGE_LEN} characters or fewer` });
    }

    // Format checks
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailReceiver = process.env.EMAIL_RECEIVER || emailUser;

    if (!emailUser || !emailPass) {
      console.warn('EMAIL_USER / EMAIL_PASS not configured in Vercel environment variables.');
      return res.status(503).json({
        error: 'Contact form is not configured. Please contact Aliyah directly by email.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass, // 16 digit Google App Password
      },
    });

    // Sanitize inputs before inserting into HTML (prevent HTML injection in email)
    const escHtml = (str) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const safeName = escHtml(name.trim());
    const safeEmail = escHtml(email.trim());
    const safeMessage = escHtml(message.trim());

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailReceiver,
      replyTo: email.trim(),
      subject: `📬 Pesan Portofolio Baru dari ${name.trim().slice(0, 80)}`,
      text: `Nama: ${name.trim()}\nEmail: ${email.trim()}\n\nPesan:\n${message.trim()}\n\nWaktu: ${new Date().toLocaleString('id-ID')}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #18181b; border-radius: 14px; background-color: #faf9f5;">
          <div style="border-bottom: 2px dashed #d4d4d8; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #18181b; font-size: 22px;">📬 Pesan Baru dari Portofolio</h2>
            <p style="margin: 4px 0 0; color: #71717a; font-size: 13px;">Ada pesan baru yang masuk melalui formulir Get in Touch website portofolio Aliyah.</p>
          </div>
          <div style="margin-bottom: 16px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase;">Pengirim:</strong>
            <div style="font-size: 16px; font-weight: bold; color: #18181b; margin-top: 2px;">${safeName}</div>
          </div>
          <div style="margin-bottom: 16px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase;">Email:</strong>
            <div style="font-size: 15px; margin-top: 2px;">
              <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${safeEmail}</a>
            </div>
          </div>
          <div style="margin-bottom: 24px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase;">Isi Pesan:</strong>
            <div style="margin-top: 6px; padding: 16px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 10px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">${safeMessage}</div>
          </div>
          <div style="border-top: 1px dashed #d4d4d8; padding-top: 14px; font-size: 12px; color: #a1a1aa; text-align: center;">
            Diterima pada ${new Date().toLocaleString('id-ID')} • Aliyah Salsabila Putri Portfolio
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Aliyah will get back to you shortly.',
    });
  } catch (error) {
    console.error('Vercel contact error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
