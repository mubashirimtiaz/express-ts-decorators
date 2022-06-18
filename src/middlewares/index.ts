import { NextFunction, Request, RequestHandler, Response } from 'express';

export const requireAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.loggedIn) {
    return next();
  } else {
    res.status(403).send('Not permitted');
  }
};
