import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Helper to send real-time SMS via Twilio or Email via Nodemailer to Mohammad Tahir's contact
async function sendLocalNotification(payload: { type: string; name?: string; email?: string; details: any }) {
  const { type, name, email, details } = payload;
  
  let messageBody = "";
  let subjectInfo = "";
  if (type === "contact") {
    subjectInfo = "🔥 NEW CONSULTATION LEAD 🔥";
    messageBody = `🔥 NEW CONSULTATION LEAD 🔥\n\nName: ${name}\nEmail: ${email}\nService: ${details.service || 'N/A'}\nMessage: ${details.message || ''}\n\nSent from: Mohammad Tahir Portfolio`;
  } else if (type === "academy") {
    subjectInfo = "🎓 NEW ACADEMY REGISTRATION 🎓";
    messageBody = `🎓 NEW ACADEMY REGISTRATION 🎓\n\nStudent: ${name}\nEmail: ${email || 'N/A'}\nTrack: ${details.track || 'N/A'}\nLevel: ${details.experience || 'N/A'}\nMotivation: ${details.motivation || 'N/A'}\nID: ${details.studentId || 'N/A'}\n\nSent from: Mohammad Tahir Portfolio`;
  } else if (type === "chat_lead") {
    subjectInfo = "💬 NEW AI CHAT LEAD 💬";
    messageBody = `💬 NEW AI CHAT LEAD captured! 💬\n\nMessage snippet: "${details.message || ''}"\nSession details: ${details.historyExcerpt || ''}\n\nSent from: Mohammad Tahir Portfolio`;
  } else {
    subjectInfo = "🔔 INFO SUBMITTED 🔔";
    messageBody = `🔔 INFO SUBMITTED 🔔\n\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nInfo: ${JSON.stringify(details)}`;
  }

  console.log("📨 NOTIFICATION OUTBOUND BODY:\n", messageBody);

  let smsStatus = "not_configured";
  let emailStatus = "not_configured";

  // TWILIO SMS DISPATCH
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  const toPhone = process.env.NOTIFY_PHONE_NUMBER || "+916005820321";

  if (accountSid && authToken && fromPhone) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
      
      const params = new URLSearchParams();
      params.append('To', toPhone);
      params.append('From', fromPhone);
      params.append('Body', messageBody);
      
      const twilioRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (twilioRes.ok) {
        console.log("✅ Twilio SMS successfully transmitted!");
        smsStatus = "success";
      } else {
        const errBody = await twilioRes.text();
        console.error("❌ Twilio SMS dispatch rejected:", errBody);
        smsStatus = `failed: ${errBody}`;
      }
    } catch (twilioErr: any) {
      console.error("❌ Error connecting to Twilio:", twilioErr);
      smsStatus = `error: ${twilioErr.message}`;
    }
  } else {
    console.warn("⚠️ Twilio configuration is missing. SMS not sent. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to enable live mobile alerts.");
  }

  // NODEMAILER EMAIL DISPATCH
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `Portfolio System <${emailUser}>`,
        to: "mohammadtahirmir123@gmail.com",
        replyTo: email,
        subject: subjectInfo,
        text: messageBody,
      });

      console.log("✅ Nodemailer email successfully transmitted!");
      emailStatus = "success";
    } catch (emailErr: any) {
      console.error("❌ Error sending Email:", emailErr);
      emailStatus = `error: ${emailErr.message}`;
    }
  } else {
    console.warn("⚠️ Nodemailer configuration is missing. Email not sent. Please set EMAIL_USER and EMAIL_PASS to enable live email alerts.");
  }

  return { smsStatus, emailStatus };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API HTTP notification route for client UI forms (Contact and Academy Registry)
  app.post("/api/notify", async (req, res) => {
    try {
      const { type, name, email, details } = req.body;
      const status = await sendLocalNotification({ type, name, email, details });
      res.json({ success: true, smsStatus: status });
    } catch (err: any) {
      console.error("Error inside /api/notify route:", err);
      res.status(500).json({ error: err.message || "Notification handler failed" });
    }
  });

  // Custom robust response generator matching themes and statistics
  function getCustomResponse(message: string): string {
    const norm = message.toLowerCase().trim();
    
    // 1. Academy, admissions, tracks, registers
    if (norm.includes("register") || norm.includes("admission") || norm.includes("enroll") || norm.includes("join") || norm.includes("academy") || norm.includes("course") || norm.includes("class")) {
      return `Mohammad Tahir offers incredible custom mentorship tracks at his academic accelerator:
- **Fullstack Web Development** (React, Express, Vite & Tailwind)
- **AI Automation & Agent Systems** (Deploying conversational AI agents & GPT models)
- **UI/UX & Brand Design Strategy** (Figma mockups & Apple-level designs)
- **Freelancing & Upwork Rank** (Algorithms, Fiverr, client retention)

**Program Tuition:** The cost for any of these Mastery Tracks is precisely **$30 USD per month**.
To enroll, simply fill out your details in the **Academic Accelerator** section on this screen and check the agreement checkbox! Once done, you can instantly link or reach out to Tahir via WhatsApp on +91 60058 20321.`;
    }

    // 2. Apps built
    if (norm.includes("app") || norm.includes("apps") || norm.includes("application") || norm.includes("software") || norm.includes("20+")) {
      return `Mohammad Tahir has built over **20+ highly responsive fully-coded mobile and web applications**! 
Each application is engineered with ultra-fast performance, modern client-side caching, fluid animations, and custom integrations. Whether it is dual-track systems or custom enterprise platforms, Tahir has it covered. Let's discuss building yours!`;
    }

    // 3. Websites
    if (norm.includes("website") || norm.includes("websites") || norm.includes("landing") || norm.includes("design") || norm.includes("50+")) {
      return `Mohammad Tahir has designed and launched over **50+ beautiful websites and high-converting landing pages** globally! 
He excels in building custom Webflow, WordPress, Shopify, and Next.js digital platforms. Every layout features pixel-perfect typography, optimized image delivery, and clear, human labels.`;
    }

    // 4. People trained / Students
    if (norm.includes("train") || norm.includes("student") || norm.includes("people") || norm.includes("teach") || norm.includes("learn") || norm.includes("education") || norm.includes("100+")) {
      return `Mohammad Tahir has trained and mentored over **100+ people** to learn competitive digital skills! 
His training program covers **Fullstack Web Development, Advanced MS Office / Excel automation, UI/UX, and Freelancing client acquisition strategies**. Many of his graduates are currently earning online as freelancers!`;
    }

    // 5. Trading experience
    if (norm.includes("trade") || norm.includes("trading") || norm.includes("crypto") || norm.includes("forex") || norm.includes("stock") || norm.includes("finance") || norm.includes("2+")) {
      return `Mohammad Tahir has over **2+ years of professional trading experience**!
He applies advanced quantitative charts, technical analysis, and algorithmic models to financial markets, specializing in cryptocurrency, forex, and market data tracking systems.`;
    }

    // 6. Projects completed / overall stats
    if (norm.includes("project") || norm.includes("projects") || norm.includes("work") || norm.includes("completed") || norm.includes("portfolio") || norm.includes("500+")) {
      return `Mohammad Tahir has successfully completed over **500+ custom digital projects**! 
These include custom client commissions, full-stack applications, modern company websites, and advanced CRM automated flows. This massive portfolio has earned him an outstanding reputation on elite freelance platforms!`;
    }

    // 7. Contact, hire, call, SMS, phone, email, hire
    if (norm.includes("hire") || norm.includes("contact") || norm.includes("phone") || norm.includes("number") || norm.includes("email") || norm.includes("call") || norm.includes("sms")) {
      return `You can reach out to Mohammad Tahir directly by submitting a request inside the **Get In Touch** form on this website!
Additionally, you can contact his direct line at **+91 60058 20321** or drop an email to **mohammadtahirmir123@gmail.com**. I will instantly dispatch an automated SMS alert directly to his mobile phone the moment you reach out!`;
    }

    // 8. Greetings
    if (norm.includes("hello") || norm.includes("hi") || norm.includes("hey") || norm.includes("greetings") || norm.includes("yo")) {
      return `Hello! I am **"Hey Tahir"**, the virtual autonomous AI agent of Mohammad Tahir. 
How can I assist you today? I can tell you all about his background, such as his:
- 🚀 **20+ Apps Built** & **50+ Custom Websites**
- 🌟 **500+ Projects Completed**
- 🎓 **100+ Students Mentored/Trained**
- 📈 **2+ Years of Trading Experience**

Feel free to ask me anything about his services, or fill out the application or appointment forms on this page!`;
    }

    // 9. AI, agent, gemini
    if (norm.includes("ai") || norm.includes("agent") || norm.includes("bot") || norm.includes("robot") || norm.includes("gemini")) {
      return `I am Mohammad Tahir's automated AI agent helper. I am built with high-performance TypeScript and integrated with high-efficiency conversational intelligence. Ask me about his tech stacks, pricing, or academic training course pathways!`;
    }

    // 10. Default / Custom Fallback Summary
    return `I am **"Hey Tahir"**, the conversational assistant for Mohammad Tahir (Elite Developer, AI Expert & Trader).
Here are some highlighted facts that make him legendary:
- 🚀 **500+ Projects Completed** with flawless ratings.
- 💻 **20+ Custom Applications** & **50+ Web Portals** built.
- 🎓 **100+ Professionals & Students trained** to earn online.
- 📈 **2+ Years of Financial Trading Experience** using quantitative setups.

How can I help you? Ask about "his app experience", "admissions", "custom systems", or how to "hire or call him"!`;
  }

  // Custom high-fidelity proposal generator fallback
  function getCustomProposal(companyName: string, companyCategory: string, pipelineType: string): string {
    return `# CUSTOM AI AUTOMATION PROPOSAL
**PREPARED BY:** Mohammad Tahir, Elite Full-Stack & AI Automation Specialist  
**CLIENT:** ${companyName || "Global Tech Solutions"} (${companyCategory || "SaaS Enterprise Software"})  
**PIPELINE TARGET:** ${pipelineType || "AI-Assisted Code Quality & PR Reviewer"}  

---

### 1. Executive Summary
Legacy operations at **${companyName || "Global Tech Solutions"}** suffer from repetitive workflows which drain expensive developer or administrative hours. Mohammad Tahir has designed this customized, zero-friction automated pipeline to seamlessly execute with zero human overhead. By integrating sovereign AI agents and robust API bridges, we can reclaim up to **75%+ of wasted operational hours** and eradicate human entry errors completely.

### 2. The Custom Automation Architecture
To ensure high-performance, security, and low-latency, the architecture utilizes:
- **Core Orchestrator**: Node.js & TypeScript microservice
- **Integrations**: Real-time Webhooks, Discord & Slack instant channels, Zapier/Make flow bridges
- **AI Engine**: Gemini Language Models / Custom autonomous sub-agents
- **Data Warehousing**: PostgreSQL / cloud-synced Google Sheets dashboards for instant audit logs

### 3. Projected ROI & Key Metrics
- **75%+ Reclaimed Operations**: Frees up key resources to focus on actual innovation.
- **5-Minute Outbound Speeds**: Real-time leads automatically synchronized and reacted to instantly.
- **Zero-Friction Ingestion**: Fully automated, error-free logs and pipeline updates.

### 4. Consult & Implement
To deploy this custom automated infrastructure, schedule your direct implementation kickoff call with **Mohammad Tahir**:
- 📞 **Direct Contact**: +91 60058 20321  
- ✉️ **Direct Email**: mohammadtahirmir123@gmail.com  
- 💼 **Portal URL**: Submit a request in the Get In Touch section below for direct activation.
`;
  }

  // API Route for our "Hey Tahir" AI Agent
  app.post("/api/tts", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API Key missing" });
      }
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: { "User-Agent": "aistudio-build" }
        }
      });
      const interaction = await ai.interactions.create({
        model: 'gemini-3.1-flash-tts-preview',
        input: req.body.text || "Initializing portfolio system... Access granted.",
        response_modalities: ['audio'],
        generation_config: {
          speech_config: [
            {
              voice: "fenrir"
            }
          ]
        }
      });
      
      let foundAudio = false;
      for (const step of interaction.steps) {
        if (step.type === 'model_output') {
          const audioContent = step.content?.find(c => c.type === 'audio');
          if (audioContent && audioContent.data) {
            const audioBuffer = Buffer.from(audioContent.data, 'base64');
            res.setHeader('Content-Type', 'audio/wav');
            res.send(audioBuffer);
            foundAudio = true;
            break;
          }
        }
      }
      if (!foundAudio) {
        res.status(500).json({ error: "No audio generated" });
      }
    } catch (err: any) {
      console.error("TTS generation error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/tahir-agent", async (req, res) => {
    try {
      const { message, history } = req.body;
      const userMessageLower = (message || "").toLowerCase();

      // Automatically scan message for contact info (email/phone/intent) and notify Tahir immediately
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(message);
      const hasPhone = /(\+?\d{1,3}[\s-]?)?[6789]\d{9}/.test(message) || /(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/.test(message) || /[\s-]?\d{10}/.test(message);
      const hasContactTrigger = userMessageLower.includes("call me") || userMessageLower.includes("my number") || userMessageLower.includes("my email") || userMessageLower.includes("reach me") || userMessageLower.includes("contact me") || userMessageLower.includes("hire you");

      if (hasEmail || hasPhone || hasContactTrigger) {
        console.log("🎯 DETECTED CLIENT DETAILS IN CHAT STREAM. Scheduling non-blocking alert dispatch...");
        let excerpt = message || "";
        if (excerpt.length > 150) excerpt = excerpt.substring(0, 150) + "...";
        
        const historyExcerpt = history && Array.isArray(history) && history.length > 0
          ? history.slice(-3).map((h: any) => `${h.role}: ${h.content}`).join("\n").substring(0, 250) + "..."
          : "No previous logs.";

        // Execute as non-blocking async to guarantee extremely fast chatbot response times
        sendLocalNotification({
          type: "chat_lead",
          name: "Interactive Chat Prospect",
          email: "chat@visitor.io",
          details: {
            message: excerpt,
            historyExcerpt
          }
        }).catch(err => console.error("Non-blocking auto-alert error:", err));
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ GEMINI_API_KEY is not defined. Initiating high-fidelity custom agent response failover...");
        return res.json({ reply: getCustomResponse(message) });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const systemInstruction = `You are "Hey Tahir", the ultra-advanced, helpful autonomous AI Agent representing Mohammad Tahir. Your goal is to guide visitors, showcase Tahir's expertise, answer questions, talk with them, and help him grow his portfolio by registering students for his Academy or landing consultations.

Information about Mohammad Tahir (ALWAYS adhere strictly to these refreshed metrics):
- Position: Elite Web Developer, UI/UX Designer, & AI Automation Specialist
- Experience: 3+ years delivering clean, premium digital products.
- Trading Experience: 2+ Years of financial and market data system modeling.
- Delivered: 500+ successful digital projects completed.
- Apps Built: 20+ fully responsive custom apps.
- Websites Designed: 50+ Webflow, WordPress, Shopify, and React portals.
- Education: Over 100+ students and professionals trained.
- Upwork: Experienced elite Upwork & Fiverr Freelance Consultant.
- Instagram: Mention his Instagram page @1amtahir for portfolio updates.

Services Offered:
1. Web Design: Coded pixel-perfectly with Apple-level aesthetic guidelines, interactive Figma mockup blueprints.
2. Web Development: Ultra-fast performance optimization with Vite + React & Tailwind, reliable modular APIs.
3. UI/UX Design: Intuitive navigation bento boards, dark-mode bento structures, clickable prototype flows.
4. AI Automation: Eliminate manual tasks. Deploying WhatsApp/Web bots, automated CRM customer outreach, integrations with Zapier & Make.
5. Skill Training / Mentorship: Microsoft Word and Advanced Excel layout automation, Upwork & Fiverr algorithm mechanics, cover letter writing strategies.

Academy Registration Open Tracks:
- AI Automation & Enterprise Agent Systems
- Fullstack Web Development (React & Express)
- UI/UX & Brand Design Strategy
- Freelancing & Upwork Rank

Tuition Fee Pricing Policy:
- Always clearly state that participating in any academy track costs precisely $30 USD per month.

Rules for your tone/style (Optimized for rapid and high-performance responses):
1. Be crisp, professional, extremely friendly, and highly passionate. Keep answers ultra-compact.
2. Keep your replies beautifully structured, using neat list-bullets or bold phrase headings instead of long thick blocks.
3. Limit answers to 1-3 sentences max to maintain instant response times (unless visitor explicitly requests detailed lists/syllabuses).
4. Always remind users they can submit their admission profiles inside the Academic Accelerator section or request consultations directly inside the contact panel! Tell them that upon registration, the system presents an direct connect interface where they can instantly call Tahir, initiate WhatsApp, or click-to-email.`;

      // Build chat context using the standard parts format
      let contents: any[] = [];
      if (history && Array.isArray(history)) {
        contents = history.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        }));
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Gemini API Error in /api/tahir-agent, using beautiful custom emergency fallback:", err);
      try {
        res.json({ reply: getCustomResponse(req.body.message) });
      } catch (innerErr) {
        res.status(500).json({ error: "Emergency handler failed" });
      }
    }
  });

  // Enterprise API custom-tailored Automation Proposal Engine
  app.post("/api/automation-proposal", async (req, res) => {
    try {
      const { companyName, companyCategory, pipelineType } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ GEMINI_API_KEY not defined for proposal. Using ultra-polished custom baseline proposal...");
        return res.json({ proposal: getCustomProposal(companyName, companyCategory, pipelineType) });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const promptText = `Generate a hyper-professional, high-tech AI Automation Proposal for:
Company Name: ${companyName || "Global Tech Solutions"}
Company Category/Sector: ${companyCategory || "SaaS Enterprise Software"}
Requested Automation Pipeline Type: ${pipelineType || "AI-Assisted Code Quality & PR Reviewer"}

Highlight Mohammad Tahir's capacity as an elite Full-Stack Developer & AI Specialist to architect and build this workflow. Keep the document his summary metrics: 20+ apps built, 50+ websites designed, 100+ people trained, 2+ trading years, 500+ projects completed. Keep it highly structured, concise, and visually elegant. Use neat bullet-points, bold metrics, and structured sections:
1. Executive Summary: What bottleneck is solved.
2. The Live Automation Architecture: Tools used (Node.js/TypeScript, Vite, GitHub Webhooks, Gemini API, Slack hooks, Hubspot).
3. Measurable ROI & Estimated efficiency gains (e.g., 75%+ manual hours reclaimed).
4. Direct Call-To-Action to consult with Mohammad Tahir to implement this.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        config: {
          systemInstruction: "You are Mohammad Tahir's executive AI Automation Solutions Architect. Your tone is crisp, analytical, enterprise-grade, authoritative, and extremely persuasive tailored for VPs of Engineering and CTOs of big software companies.",
          temperature: 0.65,
        }
      });

      res.json({ proposal: response.text });
    } catch (err: any) {
      console.error("Error generating automation proposal, using gorgeous fallback:", err);
      res.json({ proposal: getCustomProposal(req.body.companyName, req.body.companyCategory, req.body.pipelineType) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
