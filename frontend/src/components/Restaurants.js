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
          <h5 className='text-7xl font-extrabold mt-8 text-blue-500'>{restaurant.name}</h5>
          <p className='flex justify-around text-xl mt-8 ml-12'>
            <div><strong>Cuisine: </strong>{restaurant.cuisine}</div>
            <button className='border-[#fa5434] bg-[#fa5434] rounded-lg border-2 px-4 py-1'>Add Review</button>
            <div><strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}</div>
          </p>
          <h2 className='text-4xl text-left ml-4 mt-8 text-red-700 font-semibold'>Reviews</h2>
          <div className='grid grid-cols-3 gap-24 ml-24 mt-4 w-screen'>
          {restaurant.reviews.length>0?(restaurant.reviews.map((r)=>{
              return (<div className='border-black rounded-lg border-4 w-1/2 h-56'>
                <h4 className='text-xl font-semibold mt-8'>{r.name}</h4>
              <h4 className='text-lg mt-4'>{r.text}</h4>
              <div className='flex justify-around items-end mt-4'>
                <button className='border-[#fa5434] bg-[#f5ab41] border-2 px-4 py-1 rounded-xl'>Edit</button>
                <button className='border-[#fa5434] bg-[#f5ab41] border-2 px-4 py-1 rounded-xl'>Delete</button>
              </div>
              </div>)
            })):<h1 className='text-left'>No reviews yet</h1>
          }
          </div>
          
        </div>
        
        ):<div>No restaurants</div>
      }</div>
  )
}

export default Restaurants