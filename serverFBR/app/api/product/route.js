const { get, post } = require('../../../lib/fbClient');
const { verifyAuthHeader } = require('../../../lib/jwt');
const validateProduct = require('../../../lib/validation/productValidation');

export async function GET(request) {
  try {
    const resp = await get('/products.json');
    if (!resp.data) return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    const products = Object.entries(resp.data).map(([id, data]) => ({ id, ...data }));
    return new Response(JSON.stringify(products), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(request) {
  try {
    // protected
    verifyAuthHeader(request);
    const body = await request.json();
    validateProduct(body);
    const resp = await post('/products.json', body);
    const id = resp.data.name;
    return new Response(JSON.stringify({ id, ...body }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    if (err instanceof Response) return err;
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
