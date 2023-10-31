import { OpenAIModerationChain } from 'langchain/chains';
import { getTask, sendAnswer } from '../common';

const task = (await getTask('moderation')) as {
  input: [string, string, string, string];
  code: number;
  msg: string;
  token: string;
};

const result: number[] = [];

for (let input of task.input) {
  try {
    const moderation = new OpenAIModerationChain({ throwError: true });
    await moderation.call({ input });
    result.push(0);
  } catch (error) {
    result.push(1);
  }
}

await sendAnswer(task.token, JSON.stringify({ answer: result }));
