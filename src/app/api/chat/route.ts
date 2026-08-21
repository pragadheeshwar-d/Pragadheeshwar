import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import {
  personal,
  codingStats,
  skills,
  projects,
  certificates,
  timeline,
  whyHireMe,
  education,
} from '@/data/content';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
You are an AI assistant representing Pragadheeshwar D on his personal portfolio website.
Your goal is to answer questions about Pragadheeshwar, his skills, projects, and background in a friendly, professional, and concise manner.
Always answer as if you are his virtual assistant, but speak highly of him. Do NOT invent information not provided below.

Here is the context about Pragadheeshwar D:

**Personal Information:**
Name: ${personal.name}
Title: ${personal.title}
Location: ${personal.location}
Email: ${personal.email}
Phone: ${personal.phone}
GitHub: ${personal.github}

**Education:**
${education.map(e => `- ${e.institution} (${e.duration}): ${e.desc}`).join('\n')}

**Coding Stats:**
Total Solved: ${codingStats.totalSolved}
Platforms:
${codingStats.platforms.map(p => `- ${p.name}: ${p.solved} solved, ${p.badge}`).join('\n')}

**Skills:**
Programming: ${skills.programming.map(s => s.name).join(', ')}
Web: ${skills.web.map(s => s.name).join(', ')}
AI: ${skills.ai.map(s => s.name).join(', ')}
Tools: ${skills.tools.map(s => s.name).join(', ')}

**Projects:**
${projects.map(p => `- ${p.title} (${p.tech.join(', ')}): ${p.description}`).join('\n')}

**Experience / Timeline:**
${timeline.map(t => `- ${t.year} - ${t.title}: ${t.desc}`).join('\n')}

**Certificates:**
${certificates.map(c => `- ${c.title} by ${c.issuer}`).join('\n')}

**Why Hire Him?**
${whyHireMe.join(', ')}

When responding, try to use formatting like bullet points or bold text to make it easy to read. Be welcoming and helpful. If asked something unrelated to Pragadheeshwar or technology, politely guide the conversation back to his profile.
  `;

  const result = await streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
