import request from '@/utils/request';

export async function queryProducts() {
  return request('/api/products');
}

export async function insertProduct(params) {
  return request('/api/products', {
    method: 'POST',
    body: params,
  });
}

export async function updateProduct(params = {}) {
  return request('/api/products', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params,
  });
}

export async function deleteProduct(id) {
  return request(`/api/products`, {
    method: 'DELETE',
  });
}