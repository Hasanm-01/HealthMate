import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodTracker.css';

function FoodTracker() {
  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to search for products
  const searchProducts = async (searchText) => {
    if (searchText.length < 3) {
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

  // const renderNutritionalInfoPer100g = (nutriments) => {
  //   const nutrientUnits = {
  //     carbohydrates_100g: "g",
  //     energy_kj_100g: "kJ",
  //     energy_kcal_100g: "kcal",
  //     fats_100g: "g",
  //     fiber_100g: "g",
  //     proteins_100g: "g",
  //     salt_100g: "g",
  //     sodium_100g: "mg",
  //     sugars_100g: "g",
  //     saturated_fat_100g: "g",
  //     // ... any other nutrients with specific units
  //   };
  
  //   const nutrientsWithoutUnits = [
  //     "nova_group_100g",
  //     "nutrition_score_fr_100g",
  //     // ... any other nutrients that do not have units
  //   ];
  
  //   return (
  //     <ul>
  //       {Object.entries(nutriments)
  //         .filter(([key, _]) => key.endsWith("_100g"))
  //         .map(([key, value]) => {
  //           // Check if the key is in the list of nutrients without units
  //           if (nutrientsWithoutUnits.includes(key)) {
  //             return <li key={key}>{`${key.replace('_100g', '').replace(/_/g, ' ')}: ${value}`}</li>;
  //           }
  
  //           // Continue with the rest
  //           const unit = nutrientUnits[key] || 'g'; // Default to 'g' if not specified
  //           const nutrientName = key.replace('_100g', '').replace(/_/g, ' ');
  //           return <li key={key}>{`${nutrientName}: ${value} ${unit}`}</li>;
  //         })}
  //     </ul>
  //   );
  // };

  // const renderNutritionalInfoPer100g = (nutriments) => {
  //   const nutrientUnits = {
  //     carbohydrates_100g: "g",
  //     energy_kj_100g: "kJ",
  //     energy_kcal_100g: "kcal",
  //     fats_100g: "g",
  //     fiber_100g: "g",
  //     proteins_100g: "g",
  //     salt_100g: "g",
  //     sodium_100g: "mg",
  //     sugars_100g: "g",
  //     saturated_fat_100g: "g",
  //     // add other nutrients with units if necessary
  //   };
  
  //   // Display the nutritional information with the appropriate units
  //   return (
  //     <ul>
  //       {Object.entries(nutriments)
  //         .filter(([key, _]) => key.endsWith("_100g"))
  //         .map(([key, value]) => {
  //           const nutrientName = key.replace('_100g', '').replace(/_/g, ' ');
  //           // Check if nutrient should have a unit
  //           if (key in nutrientUnits) {
  //             return <li key={key}>{`${nutrientName}: ${value}${nutrientUnits[key]}`}</li>;
  //           } else {
  //             // Nutrients like 'nova_group' or 'nutrition_score_fr' do not need a unit
  //             return <li key={key}>{`${nutrientName}: ${value}`}</li>;
  //           }
  //         })}
  //     </ul>
  //   );
  // working};

  const renderNutritionalInfoPer100g = (nutriments) => {
    const nutrientUnits = {
      carbohydrates_100g: "g",
      energy_kcal_100g: "kcal",
      energy_kj_100g: "kJ",
      fat_100g: "g",
      fiber_100g: "g",
      proteins_100g: "g",
      salt_100g: "g",
      sodium_100g: "mg",
      sugars_100g: "g",
      saturated_fat_100g: "g",
      // Add other nutrients here
    };
  
    const noUnitNutrients = [
      "nova_group_100g",
      "nutrition_score_fr_100g",
      // Add other score-type nutrients here
    ];
  
    return (
      <ul>
        {Object.entries(nutriments)
          .filter(([key, _]) => key.endsWith("_100g"))
          .map(([key, value]) => {
            if (!value && value !== 0) { // Handles null, undefined, or empty string
              return null; // Don't return a list item if the value is undefined
            }
            const nutrientName = key.replace('_100g', '').replace(/_/g, ' ');
            if (noUnitNutrients.includes(key)) {
              return <li key={key}>{`${nutrientName}: ${value}`}</li>;
            }
            const unit = nutrientUnits[key] || ''; // Default to an empty string if no unit is specified
            return <li key={key}>{`${nutrientName}: ${value}${unit ? ` ${unit}` : ''}`}</li>;
          })}
      </ul>
    );
  };
  
  
  
  

  // Function to render allergens
  const renderAllergens = (product) => {
    const allergens = product.allergens_tags || [];
    return allergens.length > 0 ? (
      <ul>
        {allergens.map((allergen, index) => (
          <li key={index}>{allergen.replace('en:', '').replace(/_/g, ' ')}</li>
        ))}
      </ul>
    ) : <p>No allergens reported.</p>;
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
          <h3>Nutritional Information per 100g:</h3>
          {renderNutritionalInfoPer100g(selectedProduct.nutriments)}
          <h3>Allergens:</h3>
          {renderAllergens(selectedProduct)}
        </div>
      )}
    </div>
  );
}

export default FoodTracker;
