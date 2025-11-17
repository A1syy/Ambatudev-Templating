const {post, get} = require('../../../../lib/fbClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegister} = require('../../../../lib/validation/userValidation');

export async function POST(request) {
    try {
        const body = await request.json();
        validateRegister(body);
        const {email, password, name} = body;

        const checkResp = await get('/user.json');
        const users = checkResp.data || {};

        const existing = Object.values(users).find((u) => u.email === email);
        if (existing) {
            return new Response(JSON.stringify({
                error: 'Registration Failed',
                message: 'Email already registered'
            }), {status: 400, headers: {'Content-Type': 'application/json'}});
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = {email, name, password: hashed, createdAt: new Date().toISOString()};
        const createResp = await post('/user.json', newUser);
        const id = createResp.data.name;

        const token = jwt.sign({userId: id, email}, process.env.JWT_SECRET, {expiresIn: '24h'});

        return new Response(JSON.stringify({
            message: 'User registered successfully',
            token,
            user: {id, email, name}
        }), {status: 201, headers: {'Content-Type': 'application/json'}});
    } catch (err) {
        if (err instanceof Response) return err; // validation or jwt helper
        return new Response(JSON.stringify({error: 'Internal Server Error', message: err.message}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

