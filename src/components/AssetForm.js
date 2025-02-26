import React, {useState} from 'react';

const AssetForm = ({ handleCreateAsset, errorMessage }) => {
  const [newAsset, setNewAsset] = useState({
    symbol: "",
    name: "",
    quantity: "",
    asset_type: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value
    }));
  }; 

  const onSubmit = (e) => {
    e.preventDefault();
    // Capitalizing symbol before submitting so APIs don't get mixed up
    const assetToSubmit = {
      ...newAsset,
      symbol: newAsset.symbol.toUpperCase()
    };
    handleCreateAsset(assetToSubmit);
    setNewAsset({ symbol: "", name: "", quantity: "", asset_type: "" });
  };

  return (
    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-dark">Add New Asset</h2>
      {errorMessage && (
        <p className="text-red-500 bg-red-100 p-2 rounded">{errorMessage}</p>
      )}

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
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
        <p></p>
        <button type="submit" className="btn btn-primary w-100">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
