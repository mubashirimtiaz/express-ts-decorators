import { Request, Response } from 'express';
import { requireAuth } from '../middlewares';
import { get, controller, use } from './decorators';

@controller()
class rootController {
  @get('/')
  getHome(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
          <div>
            <div>
              You are logged In
            </div>
            <a href="/logout">logout</a>
          </div>
        `);
    } else {
      res.send(`
        <div>
          <div>
            You aren't logged In
          </div>
          <a href="/login">login</a>
        </div>
      `);
    }
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
          <div>
            <div>
             Protected Route
            </div>
          </div>
        `);
    }
  }
}
