"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.postLogin = exports.getLogin = void 0;
var getLogin = function (req, res) {
    res.send("\n    <form method='POST'>\n      <div>\n        <label for='email'>Email</label>\n        <input name='email' type='email' />\n      </div>\n      <br />\n      <div>\n        <label for='password'>Password</label>\n        <input name='password' type='password' />\n      </div>\n      <button type='submit'>submit</button>\n    </form>\n  ");
};
exports.getLogin = getLogin;
var postLogin = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else
        res.send('Invalid email or password');
};
exports.postLogin = postLogin;
var logout = function (req, res) {
    req.session = undefined;
    res.redirect('/');
};
exports.logout = logout;
