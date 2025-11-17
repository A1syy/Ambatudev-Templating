const {get, put} = require('../../../../lib/fbClient');
const {verifyAuthHeader} = require('../../../../lib/jwt');
const bcrypt = require('bcryptjs');
const {validateProfileUpdate} = require('../../../../lib/validation/userValidation');

export async function GET(request) {
    try {
        const decoded = verifyAuthHeader(request);
        const {userId} = decoded;
        const resp = await get(`/user/${userId}.json`);
        if (!resp.data) {
            return new Response(JSON.stringify({error: 'Not Found', message: 'User not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }
        const {password, ...userWithoutPassword} = resp.data;
        return new Response(JSON.stringify({id: userId, ...userWithoutPassword}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (err) {
        if (err instanceof Response) return err;
        return new Response(JSON.stringify({error: 'Internal Server Error', message: err.message}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

export async function PUT(request) {
    try {
        const decoded = verifyAuthHeader(request);
        const {userId} = decoded;
        const body = await request.json();
        validateProfileUpdate(body);

        // Get current user
        const currentResp = await get(`/user/${userId}.json`);
        if (!currentResp.data) {
            return new Response(JSON.stringify({error: 'Not Found', message: 'User not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }
        const updateData = {...currentResp.data};

        const {name, email, currentPassword, newPassword} = body;

        if (email && email !== updateData.email) {
            const checkResp = await get('/user.json');
            const users = checkResp.data || {};
            const emailExists = Object.values(users).some((u) => u.email === email);
            if (emailExists) return new Response(JSON.stringify({
                error: 'Update Failed',
                message: 'Email already in use'
            }), {status: 400, headers: {'Content-Type': 'application/json'}});
            updateData.email = email;
        }

        if (name) updateData.name = name;

        if (currentPassword && newPassword) {
            const isValid = await bcrypt.compare(currentPassword, updateData.password);
            if (!isValid) return new Response(JSON.stringify({
                error: 'Update Failed',
                message: 'Current password is incorrect'
            }), {status: 401, headers: {'Content-Type': 'application/json'}});
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(newPassword, salt);
        }

        await put(`/user/${userId}.json`, updateData);
        const {password, ...userWithoutPassword} = updateData;
        return new Response(JSON.stringify({
            message: 'Profile updated successfully',
            user: {id: userId, ...userWithoutPassword}
        }), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (err) {
        if (err instanceof Response) return err;
        return new Response(JSON.stringify({error: 'Internal Server Error', message: err.message}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

