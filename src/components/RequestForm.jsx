import { useState, useEffect } from 'react';

const RequestForm = ({ method, onSubmit, isLoading }) => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: 'male',
    status: 'active',
  });

  // Reset form when method changes
  useEffect(() => {
    if (method === 'POST') {
      setUserId('');
    }
  }, [method]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For POST, we need all user data
    // For PUT, we need userId and at least some user data
    // For GET, we may have userId (optional)
    // For DELETE, we need userId
    switch (method) {
      case 'POST':
        onSubmit(undefined, userData);
        break;
      case 'PUT':
        if (!userId) return;
        onSubmit(userId, userData);
        break;
      case 'GET':
        onSubmit(userId || undefined);
        break;
      case 'DELETE':
        if (!userId) return;
        onSubmit(userId);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {/* Show User ID input for all methods except POST */}
      {method !== 'POST' && (
        <div className="mb-3">
          <label htmlFor="userId" className="form-label text-dark">
            User ID {method === 'GET' ? '(optional)' : '(required)'}:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="form-control"
            required={method === 'PUT' || method === 'DELETE'}
          />
          {method === 'GET' && (
            <small className="form-text text-muted">Leave empty to get all users</small>
          )}
        </div>
      )}

      {/* Show user data inputs for POST and PUT methods */}
      {(method === 'POST' || method === 'PUT') && (
        <>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="form-control"
              required={method === 'POST'}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="form-control"
              required={method === 'POST'}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label text-dark">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="status" className="form-label text-dark">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={userData.status}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`btn w-100 text-white ${method === 'GET' ? 'btn-primary' : method === 'POST' ? 'btn-success' : method === 'PUT' ? 'btn-warning' : 'btn-danger'} ${isLoading ? 'disabled opacity-75' : ''}`}
      >
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <svg
              className="spinner-border spinner-border-sm me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          `Send ${method} Request`
        )}
      </button>
    </form>
  );
};

export default RequestForm;