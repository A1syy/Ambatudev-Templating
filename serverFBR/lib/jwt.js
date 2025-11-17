const jwt = require('jsonwebtoken');

function verifyAuthHeader(request) {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new Response(JSON.stringify({error: 'Unauthorized', message: 'Access token is required'}), {
            status: 401,
            headers: {'Content-Type': 'application/json'}
        });
    }

    const token = auth.split(' ')[1];
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Response(JSON.stringify({error: 'Forbidden', message: 'Invalid or expired token'}), {
            status: 403,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

module.exports = {verifyAuthHeader};

