import { METHOD_COLORS, METHOD_DESCRIPTIONS } from '../utils/constants';


const RequestTypeSelector = ({ selectedMethod, onSelectMethod }) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];

  return (
    <div className="d-flex flex-column gap-2">
      <h2 className="h5 font-weight-medium text-dark">Request Method</h2>
      <div className="d-flex flex-wrap gap-2">
        {methods.map((method) => (
          <button
            key={method}
            className={`btn text-white ${
              selectedMethod === method
                ? `${METHOD_COLORS[method]} border border-2 border-${
                    method === 'GET'
                      ? 'primary'
                      : method === 'POST'
                      ? 'success'
                      : method === 'PUT'
                      ? 'warning'
                      : 'danger'
                  } shadow-sm transform scale-105`
                : `${METHOD_COLORS[method]} opacity-75`
            }`}
            onClick={() => onSelectMethod(method)}
            style={{ transition: 'all 0.2s' }}
          >
            {method}
          </button>
        ))}
      </div>
      <p className="text-muted small mt-1">{METHOD_DESCRIPTIONS[selectedMethod]}</p>
    </div>
  );
};

export default RequestTypeSelector;