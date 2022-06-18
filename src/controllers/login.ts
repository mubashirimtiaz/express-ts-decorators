import { Response, Request } from 'express';
import { RequestWithBody } from '../interfaces';

export const getLogin = (req: Request, res: Response) => {
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
};

export const postLogin = (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else res.send('Invalid email or password');
};

export const logout = (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
};
