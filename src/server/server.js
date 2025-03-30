require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs"); 

const app = express();

// Allow multiple origins for CORS
const allowedOrigins = [
  "http://localhost:8080", // Local dev
  "https://p-999973-new.vercel.app", // Vercel production
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

app.use(express.json());

// Middleware for raw body parsing for webhooks
app.use("/webhook", express.raw({ type: "application/json" }));

//database
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase
const supabase = createClient(
  "https://tkjjlyimwsgaxoqhipqc.supabase.co", // Replace with your Supabase project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrampseWltd3NnYXhvcWhpcHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyOTIyMDcsImV4cCI6MjA1ODg2ODIwN30.3t7-FcqOY4I0vYoeQ3E1c4_oxGbccuQSbP-BiGFe3Wg" // Replace with your Supabase API key
);


// Store tokens temporarily (in production, use a database like Redis)
const downloadTokens = new Map();

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/create-checkout-session", async (req, res) => {
  const { cart, email } = req.body;

  try {
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          metadata: { isDigital: !!item.digitalDownload, fileUrl: item.fileUrl || null },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/cancel",
      customer_email: email,
      metadata: { hasDigitalProducts: cart.some((item) => item.digitalDownload) },
    });
    // Store the email in Supabase
    const { data, error } = await supabase.from("emails").insert([{ email }]);

    if (error) {
    console.error("Failed to save email to Supabase:", error.message);
    } else {
    console.log("Email saved successfully to Supabase:", data);
    }
    
    console.log("Checkout session created:", session.id, "Redirect URL:", session.url);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/check-session/:sessionId", async (req, res) => {
  try {
    console.log("Checking session ID:", req.params.sessionId);
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId, {
      expand: ["line_items"],
    });
    console.log("Session retrieved:", session.payment_status);

    if (session.payment_status === "paid" && session.metadata.hasDigitalProducts) {
      const digitalDownloads = session.line_items.data
        .filter((item) => item.price.product.metadata.isDigital === "true")
        .map((item) => {
          const token = crypto.randomBytes(16).toString("hex");
          downloadTokens.set(token, item.price.product.metadata.fileUrl);
          setTimeout(() => downloadTokens.delete(token), 24 * 60 * 60 * 1000);
          return {
            name: item.description,
            downloadUrl: `/api/download/${item.price.product.metadata.fileUrl}?token=${token}`,
          };
        });
      return res.json({ success: true, digitalDownloads });
    }
    return res.json({ success: true, message: "Order completed successfully." });
  } catch (error) {
    console.error("Error checking session:", error.message);
    res.status(500).json({ success: false, error: "Failed to retrieve session details." });
  }
});

app.get("/api/download/:fileId", (req, res) => {
  const { token } = req.query;
  const filePath = downloadTokens.get(token);

  if (!token || !filePath || filePath !== req.params.fileId) {
    return res.status(403).json({ error: "Invalid or expired download link." });
  }

  const absolutePath = path.join(__dirname, "downloads", filePath);
  res.download(absolutePath, (err) => {
    if (err) {
      console.error("Download error:", err.message);
      res.status(500).json({ error: "Failed to download file." });
    } else {
      downloadTokens.delete(token); // Single-use token
    }
  });
});

// Webhook with detailed logging
app.post("/webhook", async (req, res) => {
  console.log("Webhook POST received:");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Raw body:", req.body.toString());

  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook event parsed:", event.type, "Session ID:", event.data.object.id);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Processing session:", session.id);

    const customerEmail = session.customer_details?.email;
    console.log("Customer email:", customerEmail);

    if (session.metadata.hasDigitalProducts && customerEmail) {
      console.log("Digital products detected");
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const digitalItems = lineItems.data.filter(
        (item) => item.price.product.metadata.isDigital === "true"
      );
      console.log("Digital items:", digitalItems.length);

      const ngrokUrl = process.env.NGROK_URL || "https://abc123.ngrok-free.app"; // Replace with your ngrok URL
      const downloadLinks = digitalItems.map((item) => {
        const token = crypto.randomBytes(16).toString("hex");
        downloadTokens.set(token, item.price.product.metadata.fileUrl);
        setTimeout(() => downloadTokens.delete(token), 24 * 60 * 60 * 1000);
        return {
          name: item.description,
          url: `${ngrokUrl}/api/download/${item.price.product.metadata.fileUrl}?token=${token}`,
        };
      });
      console.log("Download links generated:", downloadLinks);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Digital Product Downloads",
        html: `
          <h2>Thank You for Your Purchase!</h2>
          <p>Here are your digital downloads:</p>
          <ul>
            ${downloadLinks.map((link) => `<li><a href="${link.url}">${link.name}</a></li>`).join("")}
          </ul>
          <p>Links expire in 24 hours. Enjoy!</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", customerEmail, "with links:", downloadLinks);
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
      }
    } else {
      console.log("No digital products or email not provided in this session");
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }

  res.status(200).json({ received: true });
});

// Test email route
app.get("https://a856-2600-4040-4783-ee00-a8b2-73c8-8125-21be.ngrok-free.app/test-email", async (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "abc@gmail.com", // Use your email from the payment method
    subject: "Test Email",
    text: "This is a test email from your server.",
  };
  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Test email error:", error.message);
    res.status(500).send("Email failed: " + error.message);
  }
});

const PORT = process.env.PORT || 4242;

// Only listen if running locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  }
  
  module.exports = app;
