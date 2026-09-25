import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function wrapper(innerHtml) {
  return "<div style='font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee;'>" +
    "<div style='background:#0f0f10;padding:24px;text-align:center;'>" +
    "<span style='color:#F7931A;font-size:22px;font-weight:800;'>Vexo</span>" +
    "</div>" +
    "<div style='padding:32px 24px;'>" + innerHtml + "</div>" +
    "<div style='padding:16px 24px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee;'>Vexo &middot; This is an automated message, please do not reply.</div>" +
    "</div>";
}

function welcomeHtml(email, username) {
  const name = username || email;
  return wrapper(
    "<h2 style='margin:0 0 8px;color:#111;'>Welcome to Vexo, " + name + "!</h2>" +
    "<p style='color:#555;font-size:14px;line-height:1.5;margin:0 0 20px;'>Your account has been created successfully with this email address. Here's what you can do next:</p>" +
    "<div style='background:#f7f7f8;border-radius:10px;padding:16px;'>" +
    "<p style='margin:0 0 4px;font-weight:700;color:#111;font-size:14px;'>Complete KYC</p>" +
    "<p style='margin:0 0 16px;color:#666;font-size:13px;'>Verify your identity to unlock full limits.</p>" +
    "<p style='margin:0 0 4px;font-weight:700;color:#111;font-size:14px;'>Fund your wallet</p>" +
    "<p style='margin:0 0 16px;color:#666;font-size:13px;'>Deposit crypto to get started.</p>" +
    "<p style='margin:0 0 4px;font-weight:700;color:#111;font-size:14px;'>Start trading</p>" +
    "<p style='margin:0;color:#666;font-size:13px;'>Send, receive, and swap your assets instantly.</p>" +
    "</div>" +
    "<p style='color:#999;font-size:12px;margin:20px 0 0;'>If you did not create this account, you can safely ignore this email.</p>"
  );
}

function loginHtml(email) {
  return wrapper(
    "<h2 style='margin:0 0 8px;color:#111;'>New sign-in detected</h2>" +
    "<p style='color:#555;font-size:14px;line-height:1.5;margin:0 0 12px;'>Your Vexo account (" + email + ") was just signed into.</p>" +
    "<p style='color:#555;font-size:14px;line-height:1.5;margin:0;'>If this was you, no action is needed. If you do not recognize this activity, please secure your account immediately.</p>"
  );
}

export async function POST(request) {
  try {
    const { type, email, username } = await request.json();
    if (!email) {
      return Response.json({ success: false, error: "Missing email" }, { status: 400 });
    }

    const subject = type === "signup" ? "Welcome to Vexo" : "New sign-in to your Vexo account";
    const html = type === "signup" ? welcomeHtml(email, username) : loginHtml(email);

    await transporter.sendMail({
      from: "\"Vexo\" <" + process.env.GMAIL_USER + ">",
      to: email,
      subject,
      html,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("notify email error", err);
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
