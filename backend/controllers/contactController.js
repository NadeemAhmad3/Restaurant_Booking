const nodemailer = require('nodemailer');

exports.sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Set up the transporter using your .env variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define the email content
  const mailOptions = {
    from: `"${name}" <${email}>`, // Shows the sender's name and email
    to: process.env.RECIPIENT_EMAIL, // The address you want to receive the email at
    subject: `New Contact Form Message: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Message from your Website Contact Form</h2>
        <p>You have received a new message from a visitor on your website.</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="padding: 10px; border-left: 4px solid #ccc; margin: 0; background-color: #f9f9f9;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
      </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};