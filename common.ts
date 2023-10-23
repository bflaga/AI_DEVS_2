const getToken = async (taskname: string) => {
  try {
    const response = await fetch(
      `${process.env.AI_DEVS_API_BASE_URL}/token/${taskname}`,
      {
        method: 'POST',
        body: JSON.stringify({ apikey: process.env.AI_DEVS_API_KEY }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    if (data.code === 0 && data.token) {
      return data.token;
    }

    throw new Error(
      'Couldn`t find token in resposne data: ' + JSON.stringify(data)
    );
  } catch (error: any) {
    console.log(error);
  }
};

export const getTask = async (taskname: string) => {
  try {
    const token = await getToken(taskname);
    const response = await fetch(
      `${process.env.AI_DEVS_API_BASE_URL}/task/${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    if (data.code === 0) {
      return { ...data, token };
    }

    throw new Error(
      'Get task failed due to unknown reason: ' + JSON.stringify(data)
    );
  } catch (error: any) {
    console.log(error);
  }
};

export const sendAnswer = async (token: string, answerPayload: string) => {
  try {
    const response = await fetch(
      `${process.env.AI_DEVS_API_BASE_URL}/answer/${token}`,
      {
        method: 'POST',
        body: answerPayload,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    if (data.code === 0) {
      console.log(data);
      return data;
    }

    throw new Error(
      'Send answer failed due to unknown reason: ' + JSON.stringify(data)
    );
  } catch (error: any) {
    console.log(error);
  }
};
