import { useState } from 'react';
import { Info, AlertCircle } from 'lucide-react';
import { makeRequest } from '../services/api';
import RequestTypeSelector from './RequestTypeSelector';
import TokenInput from './TokenInput';
import RequestForm from './RequestForm';
import ResponseDisplay from './ResponseDisplay';

const ApiInterface = () => {
  const [method, setMethod] = useState('GET');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleRequest = async (userId, userData) => {
    if (!token) {
      setError('Please enter an API token');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await makeRequest(method, token, userId, userData);
      setResponse(result);

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto" style={{ maxWidth: '64rem' }}>
      {/* Header */}
      <div className="mb-4 p-4 bg-white rounded shadow-sm border">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h1 className="h3 font-weight-bold text-dark mb-1">GoRest API Interface</h1>
            <div className="d-flex align-items-center text-muted">
              <a
                href="https://gorest.co.in/public/v2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary me-2"
              >
                https://gorest.co.in/public/v2
              </a>
              <span className="d-inline-flex align-items-center bg-light text-muted rounded px-2 py-1">
                <Info size={12} className="me-1" />
                Users Endpoint
              </span>
            </div>
          </div>

          <div className="w-100 w-md-auto">
            <TokenInput token={token} onTokenChange={setToken} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-4">
        {/* Left Side - Controls */}
        <div className="col-md-5">
          <div className="mb-4 bg-white rounded shadow-sm border p-4">
            <RequestTypeSelector selectedMethod={method} onSelectMethod={setMethod} />
          </div>

          <div className="bg-white rounded shadow-sm border p-4">
            <h2 className="h5 font-weight-medium text-dark mb-3">Request Details</h2>

            {error && (
              <div className="alert alert-danger d-flex align-items-start" role="alert">
                <AlertCircle size={16} className="me-2 mt-1 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <RequestForm method={method} onSubmit={handleRequest} isLoading={isLoading} />
          </div>
        </div>

        {/* Right Side - Response */}
        <div className="col-md-7">
          <div className="bg-white rounded shadow-sm border p-4">
            <h2 className="h5 font-weight-medium text-dark mb-3">Response</h2>
            <ResponseDisplay response={response} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center text-muted small">
        <p>
          GoRest API requires authentication.
          <a
            href="https://gorest.co.in/consumer/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary ms-1"
          >
            Get your token here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiInterface;