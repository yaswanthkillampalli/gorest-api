import { USERS_ENDPOINT } from '../utils/constants';

export const fetchUsers = async (token, userId) => {
  try {
    const endpoint = userId ? `${USERS_ENDPOINT}/${userId}` : USERS_ENDPOINT;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const createUser = async (token, userData) => {
  try {
    const response = await fetch(USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const updateUser = async (token, userId, userData) => {
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { data: null, status: 204 };
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const makeRequest = async (method, token, userId, userData) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(method)) {
    throw new Error(`Unsupported method: ${method}`);
  }

  switch (method) {
    case 'GET':
      return fetchUsers(token, userId);
    case 'POST':
      if (!userData) throw new Error('User data is required for POST requests');
      return createUser(token, userData);
    case 'PUT':
      if (!userId) throw new Error('User ID is required for PUT requests');
      if (!userData) throw new Error('User data is required for PUT requests');
      return updateUser(token, userId, userData);
    case 'DELETE':
      if (!userId) throw new Error('User ID is required for DELETE requests');
      return deleteUser(token, userId);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};