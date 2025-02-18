import React from 'react';

const AssetList = ({ assets, handleDeleteAsset }) => {
  return (
    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Assets</h2>
      {assets.length > 0 ? (
        <ul className="space-y-4">
          {assets.map((asset) => (
            <li key={asset.id || asset.symbol} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-lg font-semibold">{asset.symbol}</p>
              <p className="text-lg font-semibold">{asset.name}</p>
              <p className="text-gray-700">Price: ${Number(asset.market_price).toFixed(2) || "N/A"}</p>
              <button
                onClick={() => handleDeleteAsset(asset.id)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Wow. So empty.</p>
      )}
    </div>
  );
};

export default AssetList;
