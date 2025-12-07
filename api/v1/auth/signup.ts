



import { registerUser } from '../../../src/service/authentication.service';
import { validateRegistration, handleValidation } from '../../../src/validator/auth.validation';


function runMiddleware(req: any, res: any, fn: any) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result?: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default async function handler(req: any, res: any) {


  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }


  try {
      await runMiddleware(req, res, validateRegistration);
    await runMiddleware(req, res, handleValidation);
    const dataInfo = req.body; 

    const result = await registerUser(dataInfo);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: 'data is not coming from service' });
    }
    return res.status(201).json({ success: true,  message: 'User registered successfully',  data: result,
    });
  } catch (err: any) {
    console.error('Signup handler error:', err);
    return res
      .status(500)
      .json({ success: false, message: err.message || 'Internal Server Error' });
  }
}
