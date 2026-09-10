import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'College Discovery API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
