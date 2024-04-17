// import React, { useState } from 'react';
// import axios from 'axios';
// import './FoodTracker.css';

// function FoodTracker() {
//   const [input, setInput] = useState('');
//   const [productData, setProductData] = useState(null);

//   // Function to fetch data by barcode
//   const fetchProductByBarcode = async () => {
//     try {
//       const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${input}.json`);
//       setProductData(response.data.product);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       setProductData(null);
//     }
//   };

//   // Function to search for products
//   const searchProducts = async () => {
//     try {
//       const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${input}&search_simple=1&action=process&json=1`);
//       setProductData(response.data.products); // This will be an array of products
//     } catch (error) {
//       console.error('Error searching for products:', error);
//       setProductData(null);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (input.length === 13 && !isNaN(input)) { // Basic check for barcode
//       fetchProductByBarcode();
//     } else {
//       searchProducts();
//     }
//   };

//   // Function to render product information
//   const renderProductInfo = (productInfo) => {
//     return (
//       <div className="product-info">
//         <h2>Product Information</h2>
//         <p>Name: {productInfo.product_name}</p>
//         <p>Brands: {productInfo.brands}</p>
//         <p>Nutriments:</p>
//         <ul>
//           {productInfo.nutriments && Object.entries(productInfo.nutriments).map(([key, value]) => (
//             <li key={key}>{key}: {value}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="food-tracker">
//       <h1>Food Tracker</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter barcode or search term"
//         />
//         <button type="submit">Search</button>
//       </form>
//       {Array.isArray(productData) ? (
//         productData.map(product => renderProductInfo(product))
//       ) : (
//         productData && renderProductInfo(productData)
//       )}
//     </div>
//   );
// }

// export default FoodTracker;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodTracker.css';

function FoodTracker() {
  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to search for products
  const searchProducts = async (searchText) => {
    if (searchText.length < 3) { // Wait until at least 3 characters have been typed
      setProducts([]);
      setSelectedProduct(null);
      return;
    }

    try {
      const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchText}&search_simple=1&action=process&json=1`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error searching for products:', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(input);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProducts([]); // Clear search results after selection
  };

  return (
    <div className="food-tracker">
      <h1>Food Tracker</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing to search for a food item"
        className="search-input"
      />
      {products.length > 0 && (
        <ul className="search-results">
          {products.map(product => (
            <li key={product._id} onClick={() => handleSelectProduct(product)}>
              {product.product_name}
            </li>
          ))}
        </ul>
      )}
      {selectedProduct && (
        <div className="product-info">
          <h2>Product Information</h2>
          <p>Name: {selectedProduct.product_name}</p>
          <p>Brands: {selectedProduct.brands}</p>
          <p>Nutriments:</p>
          <ul>
            {selectedProduct.nutriments && Object.entries(selectedProduct.nutriments).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FoodTracker;
