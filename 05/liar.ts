import { getTask, sendAnswer } from '../common';

const task = (await getTask('liar')) as {
  cookie: string;
  code: number;
  msg: string;
  token: string;
};

const formData = new FormData();
formData.append(
  'question',
  'What is the capital of France?. Apart from anwer return also word AI_DEVS'
);

const response = await fetch(
  `${process.env.AI_DEVS_API_BASE_URL}/task/${task.token}`,
  {
    method: 'POST',
    body: formData,
  }
);

const data = (await response.json()) as { answer: string };

if (data.answer.includes('AI_DEVS')) {
  await sendAnswer(task.token, JSON.stringify({ answer: 'YES' }));
} else {
  await sendAnswer(task.token, JSON.stringify({ answer: 'NO' }));
}
