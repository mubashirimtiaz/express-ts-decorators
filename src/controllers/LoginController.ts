import { Request, Response } from 'express';
import { bodyValidator, controller, get, post, use } from './decorators';

@controller('/')
class Login {
  @get('login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method='POST'>
        <div>
          <label for='email'>Email</label>
          <input name='email' type='email' />
        </div>
        <br />
        <div>
          <label for='password'>Password</label>
          <input name='password' type='password' />
        </div>
        <button type='submit'>submit</button>
      </form>
    `);
  }

  @post('login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('logout')
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
