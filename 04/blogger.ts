import { ChatOpenAI } from 'langchain/chat_models/openai';
import { getTask, sendAnswer } from '../common';
import { HumanMessage, SystemMessage } from 'langchain/schema';

const task = (await getTask('blogger')) as {
  blog: string[];
  code: number;
  msg: string;
  token: string;
};

const chat = new ChatOpenAI();
const { content } = await chat.call([
  new SystemMessage(`I'm a blogger. I'm writing only in Polish language.`),
  new HumanMessage(
    `Write a blog post about the following topic: ${task.blog.join(
      ', '
    )}. Each chapter should have 2 or 3 sentences. Return it as JSON array where each element is a chapter.`
  ),
]);

await sendAnswer(task.token, JSON.stringify({ answer: JSON.parse(content) }));
