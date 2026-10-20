import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// Express backend for Aliyah Salsabila Putri's Portfolio (reloaded)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_DIR = path.join(__dirname, 'data');
const PORTFOLIO_FILE = path.join(__dirname, '..', 'shared', 'portfolioData.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Middlewares
// CORS: allow only known origins (dev + future production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  // Add your Vercel domain here when deployed, e.g.:
  // 'https://your-portfolio.vercel.app',
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin '${origin}' not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '50kb' })); // Cap request body size

// Helper functions for file reading/writing
async function readData(filePath, fallback = {}) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return fallback;
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}


// Routes
// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'portfolio-backend', timestamp: new Date().toISOString() });
});

// 2. Get all portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await readData(PORTFOLIO_FILE, {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve portfolio data' });
  }
});

// 3. Get single project detail
app.get('/api/projects/:id', async (req, res) => {
  try {
    const data = await readData(PORTFOLIO_FILE, { projects: [] });
    const project = data.projects?.find((p) => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
});

// Helper function to send email notification
async function sendEmailNotification({ name, email, message }) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailReceiver = process.env.EMAIL_RECEIVER || emailUser;

  if (!emailUser || !emailPass) {
    console.log('ℹ️ [Email]: EMAIL_USER / EMAIL_PASS belum diset di .env. Pesan hanya disimpan di messages.json.');
    return { sent: false, reason: 'credentials_missing' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass, // 16 digit Google App Password
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailReceiver,
      replyTo: email,
      subject: `📬 Pesan Portofolio Baru dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\nWaktu: ${new Date().toLocaleString('id-ID')}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #18181b; border-radius: 14px; background-color: #faf9f5;">
          <div style="border-bottom: 2px dashed #d4d4d8; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #18181b; font-size: 22px;">📬 Pesan Baru dari Portofolio</h2>
            <p style="margin: 4px 0 0; color: #71717a; font-size: 13px;">Ada pesan baru yang masuk melalui formulir Get in Touch website portofolio Aliyah.</p>
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Pengirim:</strong>
            <div style="font-size: 16px; font-weight: bold; color: #18181b; margin-top: 2px;">${escapeHtml(name)}</div>
          </div>

          <div style="margin-bottom: 16px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email Pengirim:</strong>
            <div style="font-size: 15px; margin-top: 2px;">
              <a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <strong style="color: #52525b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Isi Pesan:</strong>
            <div style="margin-top: 6px; padding: 16px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 10px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <div style="border-top: 1px dashed #d4d4d8; padding-top: 14px; font-size: 12px; color: #a1a1aa; text-align: center;">
            Diterima pada ${new Date().toLocaleString('id-ID')} • Aliyah Salsabila Putri Portfolio
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ [Email]: Berhasil mengirim notifikasi email ke ${emailReceiver}`);
    return { sent: true };
  } catch (err) {
    console.error('⚠️ [Email]: Gagal mengirim email via Nodemailer:', err.message);
    return { sent: false, error: err.message };
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>\"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  })[character]);
}

// 4. Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    if (name.trim().length > MAX_NAME_LENGTH) {
      return res.status(400).json({ error: `Name must be ${MAX_NAME_LENGTH} characters or fewer` });
    }
    if (email.trim().length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ error: 'Email address is too long' });
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` });
    }

    const messages = await readData(MESSAGES_FILE, []);
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    messages.unshift(newMessage);
    if (!await writeData(MESSAGES_FILE, messages)) {
      return res.status(500).json({ error: 'Failed to save message' });
    }

    // Kirim notifikasi email via nodemailer jika .env sudah dikonfigurasi
    const emailResult = await sendEmailNotification({
      name: newMessage.name,
      email: newMessage.email,
      message: newMessage.message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Aliyah will get back to you shortly.',
      data: newMessage,
      emailDelivered: emailResult.sent,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// 5. Get all submitted messages (For Inbox Viewer)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await readData(MESSAGES_FILE, []);
    res.json({
      count: messages.length,
      unreadCount: messages.filter(m => !m.read).length,
      messages
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// 6. Delete a message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const messages = await readData(MESSAGES_FILE, []);
    const updated = messages.filter((m) => m.id !== req.params.id);
    if (updated.length === messages.length) {
      return res.status(404).json({ error: 'Message not found' });
    }
    if (!await writeData(MESSAGES_FILE, updated)) {
      return res.status(500).json({ error: 'Failed to save message changes' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// 7. Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const messages = await readData(MESSAGES_FILE, []);
    const msg = messages.find(m => m.id === req.params.id);
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }
    msg.read = true;
    if (!await writeData(MESSAGES_FILE, messages)) {
      return res.status(500).json({ error: 'Failed to save message changes' });
    }
    res.json({ success: true, message: 'Message marked as read', data: msg });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Express backend running on http://localhost:${PORT}`);
});
