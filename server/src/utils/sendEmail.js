import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "abhiyan1997@gmail.com",
    pass: "hran ugan lpve suzi",  
  },
});

const sendEmailBooking = async (to, content) => {
  const info = await transporter.sendMail({
    from: '"Abhiyan Paudel" <abhiyan1997@gmail.com>',
    to: to,
    subject: "✅ Your Service is Booked Successfully - Taska",
    text: `Hello ${content.customername || "Customer"}, 

Your service booking has been confirmed.

📅 Date: ${content.date}  
⏰ Time: ${content.timing}  
🛠 Service: ${content.serviceName}  
💵 Price: NPR ${content.price}/hr  

⚠️ Note: This is an inspection cost. If additional items are required during the service, extra charges may apply.

Thank you for choosing Taska!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        <h2>✅ Service Booking Confirmation</h2>
        <p>Hello <b>${content.customername || "Customer"}</b>,</p>
        <p>Your service booking has been <b>successfully confirmed</b>.</p>
        <ul>
          <li><b>📅 Date:</b> ${content.date}</li>
          <li><b>⏰ Time:</b> ${content.timing}</li>
          <li><b>🛠 Service:</b> ${content.serviceName}</li>
          <li><b>💵 Price:</b> NPR ${content.price}/hr</li>
        </ul>
        <p><b>⚠️ Note:</b> This is an inspection cost. Additional items required for service will be charged separately.</p>
        <p>Thank you for choosing <b>Taska</b>! 🙌</p>
      </div>
    `,
  });

  console.log("Message sent:", info.messageId);
};

const sendEmailRegistration = async (to, content) => {
  const info = await transporter.sendMail({
    from: '"Abhiyan Paudel" <abhiyan1997@gmail.com>',
    to: to,
    subject: `🎉 Welcome to Taska, ${content.name}!`,
    text: `Hi ${content.name},

Welcome to Taska! We’re excited to have you join our community.  
With Taska, you can easily book trusted professionals for your daily services like plumbing, cleaning, electrical work, and more.

Your account has been successfully created.  
You can now explore and book services anytime.

If you have any questions, feel free to reach out to us at support@taska.com.

Best regards,  
The Taska Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#4CAF50;">Welcome to Taska, ${content.name}! 🎉</h2>
        <p>Hi <b>${content.name}</b>,</p>
        <p>We’re excited to have you join <b>Taska</b> – your one-stop platform for booking trusted professionals.</p>
        <p>
          ✅ Easy service booking <br>
          ✅ Verified providers <br>
          ✅ Transparent pricing
        </p>
        <p>
          Your account has been created successfully. You can now explore and book services anytime.
        </p>
        <p>If you need help, contact us at <a href="mailto:support@taska.com">support@taska.com</a>.</p>
        <br>
        <p style="font-size:14px; color:#777;">Cheers,<br>The Taska Team</p>
      </div>
    `,
  });

  console.log("Message sent:", info.messageId);
};


export default {sendEmailBooking, sendEmailRegistration};
