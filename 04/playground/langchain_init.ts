import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage } from 'langchain/schema';

const chat = new ChatOpenAI();
const { content } = await chat.call([new HumanMessage('Hello, how are you?')]);

console.log(content);
