import React from 'react';

const AssetForm = ({ newAsset = {}, handleInputChange, handleCreateAsset, errorMessage }) => {
  return (
    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Add New Asset</h2>
      {errorMessage && (
        <p className="text-red-500 bg-red-100 p-2 rounded">{errorMessage}</p>
      )}

      <form onSubmit={handleCreateAsset} className="mt-4 space-y-4">
        <input
          type="text"
          name="symbol"
          value={newAsset.symbol}
          onChange={handleInputChange}
          placeholder="Asset Symbol"
          className="form-control"
          required
        />
        <input
          type="text"
          name="name"
          value={newAsset.name}
          onChange={handleInputChange}
          placeholder="Asset Name"
          className="form-control"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newAsset.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="form-control"
          required
        />
        <select
          name="asset_type"
          value={newAsset.asset_type}
          onChange={handleInputChange}
          className="form-control"
          required
        >
          <option value="">Select Asset Type</option>
          <option value="stock">stock</option>
          <option value="crypto">crypto</option>
        </select>
        <button type="submit" className="btn btn-primary w-100">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
