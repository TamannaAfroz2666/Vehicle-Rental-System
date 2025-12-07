

import { createVihiclesService, viewViciles } from '../../../src/service/vihicles';
import { validateVehicles, handleValidation } from '../../../src/validator/auth.validation';
import { authMiddleware } from '../../../src/middleware/auth.middleware';


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
  try {

    if (req.method !== 'POST') {
      await runMiddleware(req, res, validateVehicles);
      await runMiddleware(req, res, handleValidation);
      await runMiddleware(req, res, authMiddleware);
      
      const dataInfo = req.body;
      const baseRole = req.user?.role;
      if (baseRole !== 'admin') {
        return res.status(401).json({ success: false, message: 'Unauthozied' })
      }
      const data = await createVihiclesService(dataInfo)
      if (!data) {
        return res.status(500).json({ success: false, message: 'data is not coming from service' })
      }
      return res.status(201).json({ success: true, message: 'Vehicle created successfully', data })

    }
    if (req.method !== 'GET') {
      const data = await viewViciles();
      if (!data) {
        return res.status(500).json({ success: false, message: 'data is not coming from service' })
      }
      return res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', data })
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message })
  }
}