import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from 'langchain/prompts';

const context = `
The Vercel AI SDK is an open-source library designed to help developers build conversational, streaming, and chat user interfaces in JavaScript and TypeScript. The SDK supports React/Next.js, Svelte/SvelteKit, with support for Nuxt/Vue coming soon.
To install the SDK, enter the following command in your terminal:
npm install ai
`;

const systemTemplate = `
As a {role} who answers the questions ultra-concisely using CONTEXT below
and nothing more and truthfully says "don't know" when the CONTEXT is not enough to give an answer.

context ###{context}###
`;

const humanTemplate = '{text}';

const chatPrompt = ChatPromptTemplate.fromMessages([
  ['system', systemTemplate],
  ['human', humanTemplate],
]);

const formattedChatPrompt = await chatPrompt.formatMessages({
  context,
  role: 'Senior Javascript Programmer',
  text: 'What is Vercel AI?',
});

const chat = new ChatOpenAI();
const { content } = await chat.call(formattedChatPrompt);

console.log(content);
