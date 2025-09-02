import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, phone, email, service, dogs, yardSize, message } = req.body;

  if (!firstName || !lastName || !phone || !email || !service || !dogs || !yardSize) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  // Set up your email transporter (e.g., using Gmail, SendGrid, etc.)
  // IMPORTANT: You MUST store these credentials in Vercel Environment Variables.
  // DO NOT hard-code them in the file.
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'smtp.sendgrid.net'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jbakerbba@gmail.com', // Your personal email
    subject: `New Quote Request from Scooper Co. Website`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Number of Dogs:</strong> ${dogs}</p>
      <p><strong>Yard Size:</strong> ${yardSize}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
}
