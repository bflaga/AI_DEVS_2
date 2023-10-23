import { getTask, sendAnswer } from '../common';

const task = (await getTask('helloapi')) as {
  cookie: string;
  code: number;
  msg: string;
  token: string;
};

await sendAnswer(task.token, JSON.stringify({ answer: task.cookie }));
