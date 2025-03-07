import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const beerImages = {
  "New England / Hazy IPA": "https://www.beercartel.com.au/product_images/uploaded_images/neipa2017-cp.jpg",
  "Imperial / Double IPA": "https://learn.kegerator.com/wp-content/uploads/2016/05/double-ipa-style.jpg",
  "American Brown Ale": "https://cdn.homebrewersassociation.org/wp-content/uploads/2022/11/11144711/porter-brown-beer-1440.jpg",
  "Black IPA": "https://learn.kegerator.com/wp-content/uploads/2018/03/black-ipa.jpg",
  "Default": "https://media.istockphoto.com/id/527371297/photo/glass-of-beer.jpg?s=612x612&w=0&k=20&c=xwnry32waKxaDsZ_rIOTYHKPPFybCcfgYGd1uaWX1rM="
};

const Home = () => {
  const [beverages, setBeverages] = useState([]);
  const [filteredBeverages, setFilteredBeverages] = useState([]);
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await fetch(
          "https://beer9.p.rapidapi.com/?brewery=Berkshire%20brewing%20company",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "b232c393cdmsh807e3bbf836b436p164c90jsn5f351fcc9fa1",
              "X-RapidAPI-Host": "beer9.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data.data)) {
          const transformedBeverages = data.data.map(bev => ({
            ...bev,
            id: bev.sku,
            image: "https://via.pla",
            price: 5.99,
            type: bev.category,
          }));
          setBeverages(transformedBeverages);
          setFilteredBeverages(transformedBeverages);
        } else {
          console.warn("No valid array found in 'data.data', keeping beverages empty.");
          setBeverages([]); // Explicitly set to empty array on failure
          setFilteredBeverages([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setBeverages([]); // Ensure it’s an array even on error
        setFilteredBeverages([]);
      }
    };

    fetchBeverages();
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "All") {
      setFilteredBeverages(beverages);
    } else {
      setFilteredBeverages(
        beverages.filter((bev) => bev.sub_category_3 === category)
      );
    }
  };

  return (
    <div className="home-container">
      <div className="filter-buttons">
        {["All", "New England / Hazy IPA", "Imperial / Double IPA", "American Brown Ale", "Black IPA"].map((category) => (
          <button key={category} onClick={() => handleFilterChange(category)}>
            {category}
          </button>
        ))}
      </div>
      
      <div className="beverage-box">
        <h2>Available Beers</h2>
        <div className="beverage-list">
          {filteredBeverages.length > 0 ? (
            filteredBeverages.map((bev) => (
              <div key={bev.id} className="beverage-card">
                <img 
                  src={beerImages[bev.sub_category_3] || beerImages["Default"]} 
                  alt={bev.name} 
                  className="bev-image" 
                />
                <h3>{bev.name}</h3>
                <p>{bev.sub_category_3}</p>
                <p>${bev.price ? bev.price.toFixed(2) : "N/A"}</p>
                <button onClick={() => dispatch(addToCart(bev))}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>Loading beverages...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
