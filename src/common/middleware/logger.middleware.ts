import { Request, Response } from 'express';

export function logger(req: Request, res: Response, next: () => void) {
  console.log(`Incoming Request: ${req.method} ${req.url}`)
  next();
}
