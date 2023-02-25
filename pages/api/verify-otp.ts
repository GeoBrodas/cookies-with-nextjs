import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method === 'POST' // only allow POST requests
  ) {
    // caputure the name from the request body
    const { name } = req.body;

    const words = ['Aplha', 'Tango', 'Charlie', 'India', 'Kilo', 'Lima'];

    // choose 3 index from the words array
    const randomWords = words.sort(() => Math.random() - 0.5).slice(0, 3);

    // choose 3 random numbers between 0 and 9
    const randomNumbers = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 10)
    );

    // combine the words and numbers and arrange them randomly
    let code = randomWords
      .concat(randomNumbers.toString().split(' '))
      .sort(() => Math.random() - 0.5)
      .join('-');

    // format the code to uppercase and remove commas and replace with -
    code = code.toUpperCase().replace(/,/g, '-');

    console.log('code', code);

    //   otp verification logic

    //   set cookie
    setCookie('authorize', true, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    //   respond with status and message
    return res.status(200).json({
      message: `${name} is authorized to access`,
      authorize: true,
      code,
    });
  }
}
