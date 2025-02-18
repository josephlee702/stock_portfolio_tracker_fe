import React from 'react';

const AssetList = ({ assets, handleDeleteAsset }) => {
  return (
    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Assets</h2>
      {assets.length > 0 ? (
        <ul className="list-group list-group-flush">
          {assets.map((asset) => (
            <li key={asset.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{asset.symbol} ({asset.name})</h5>
                <p className="mb-1">Price: ${Number(asset.market_price).toFixed(2) || "N/A"}</p>
              </div>
              <button
                onClick={() => handleDeleteAsset(asset.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Wow. So empty.</p>
      )}
    </div>
  );
};

export default AssetList;
