const { get } = require('../../../../lib/fbClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateLogin } = require('../../../../lib/validation/userValidation');

export async function POST(request) {
  try {
    const body = await request.json();
    validateLogin(body);
    const { email, password } = body;

    const resp = await get('/user.json');
    if (!resp.data) {
      return new Response(JSON.stringify({ error: 'Authentication Failed', message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const users = resp.data;
    const entry = Object.entries(users).find(([_, u]) => u.email === email);
    if (!entry) {
      return new Response(JSON.stringify({ error: 'Authentication Failed', message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const [userId, user] = entry;

    if (!user.password.startsWith('$2')) {
      if (password !== user.password) {
        return new Response(JSON.stringify({ error: 'Authentication Failed', message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
    } else {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return new Response(JSON.stringify({ error: 'Authentication Failed', message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
    }

    const token = jwt.sign({ userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return new Response(JSON.stringify({ message: 'Login successful', token, user: { id: userId, email: user.email, name: user.name } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    if (err instanceof Response) return err;
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

