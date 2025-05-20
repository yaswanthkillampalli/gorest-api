
const ResponseDisplay = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 border rounded bg-white shadow-sm" style={{ height: '300px' }}>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-2">
          <div className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted font-weight-medium">Loading response...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="p-4 border rounded bg-white shadow-sm" style={{ height: '300px' }}>
        <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
          <div>
            <p className="h5">No response yet</p>
            <p className="small">Make a request to see results here</p>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const statusClass = isSuccess ? 'bg-success text-white' : 'bg-danger text-white';

  return (
    <div className="border rounded bg-white shadow-sm overflow-hidden">
      <div className="p-3 border-bottom bg-light d-flex align-items-center justify-content-between">
        <h3 className="h5 font-weight-medium text-dark mb-0">Response</h3>
        <span className={`px-2 py-1 rounded-pill small font-weight-medium ${statusClass}`}>
          Status: {response.status}
        </span>
      </div>

      {response.error ? (
        <div className="p-3 bg-danger bg-opacity-10 text-danger border-start border-4 border-danger">
          <p className="font-weight-medium mb-1">Error</p>
          <p>{response.error}</p>
        </div>
      ) : (
        <div className="p-3 overflow-auto" style={{ maxHeight: '400px' }}>
          <pre className="bg-dark text-light p-3 rounded text-sm">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;