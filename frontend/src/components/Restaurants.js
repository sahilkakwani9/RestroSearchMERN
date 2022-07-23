import React from 'react'
import { useEffect, useState } from 'react';
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

function Restaurants(props) {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  let { id } = useParams();

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  return (
    <div className='bg-[#f3f4f6] min-h-10xl overflow-hidden'>{
      restaurant?
      (<div>
          <h5 className='text-7xl font-extrabold text-blue-500'>{restaurant.name}</h5>
          <p className='flex justify-around text-xl mt-8'>
            <div><strong>Cuisine: </strong>{restaurant.cuisine}</div>
            <div><strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}</div>
          </p>
          <h2 className='text-4xl text-left ml-4 mt-8 text-red-700'>Reviews</h2>
          <div className='grid grid-cols-3'>
          {
            restaurant.reviews.map((r)=>{
              return (<div>
                <h4>{r.name}</h4>
              <h4>{r.text}</h4>
              </div>)
            })
          }
          </div>
          
        </div>
        
        ):<div>No restaurants</div>
      }</div>
  )
}

export default Restaurants