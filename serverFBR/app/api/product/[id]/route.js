const {get, put, del} = require('../../../../lib/fbClient');
const {verifyAuthHeader} = require('../../../../lib/jwt');
const validateProduct = require('../../../../lib/validation/productValidation');

export async function GET(request, {params}) {
    try {
        const {id} = params;
        const resp = await get(`/products/${id}.json`);
        if (!resp.data) return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Product not found'
        }), {status: 404, headers: {'Content-Type': 'application/json'}});
        return new Response(JSON.stringify({id, ...resp.data}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (err) {
        return new Response(JSON.stringify({error: 'Internal Server Error', message: err.message}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

export async function PUT(request, {params}) {
    try {
        verifyAuthHeader(request);
        const {id} = params;
        const checkResp = await get(`/products/${id}.json`);
        if (!checkResp.data) return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Product not found while updating'
        }), {status: 404, headers: {'Content-Type': 'application/json'}});
        const body = await request.json();
        validateProduct(body);
        const resp = await put(`/products/${id}.json`, body);
        return new Response(JSON.stringify({id, ...resp.data}), {
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

export async function DELETE(request, {params}) {
    try {
        verifyAuthHeader(request);
        const {id} = params;
        const checkResp = await get(`/products/${id}.json`);
        if (!checkResp.data) return new Response(JSON.stringify({
            error: 'Not Found',
            message: 'Product not found'
        }), {status: 404, headers: {'Content-Type': 'application/json'}});
        await del(`/products/${id}.json`);
        return new Response(JSON.stringify({message: 'Product successfully deleted', id}), {
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
