import React from 'react'
import { useEffect, useState } from 'react';
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";
import useStore from "../store/store"

function Restaurants(props) {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  let { id } = useParams();
  const state = useStore();
  const setuId = state.setuId;
  const setrId = state.setrId;
  const setReId = state.setReId;

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

  const deleteReviews = (reviewId,userId) => {
    RestaurantDataService.deleteReview(reviewId, userId)
      .then(response => {
        console.log(response);
        getRestaurant(id);
      })
      .catch(e => {
        console.log(e);
      })
  }



  useEffect(() => {
    getRestaurant(id);
    setReId(id);
  }, [id]);

  return (
    <div className='bg-[#f3f4f6] min-h-10xl overflow-hidden'>{
      restaurant?
      (<div>
          <p class="text-7xl mt-8 dark:text-white font-One font-semibold">{restaurant.name}</p>
          <p className='flex justify-around text-xl mt-8 ml-20'>
            <div><strong>Cuisine: </strong>{restaurant.cuisine}</div>
            <Link to='/add'><button type="button" class="py-3 px-5 mr-2 mb-2 text-md font-medium text-white focus:outline-none bg-black rounded-full border border-black-200 hover:bg-black-100 hover:text-blue-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Review</button></Link>
            <div><strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}</div>
          </p>
          <div className='grid grid-cols-3 gap-24 ml-12 mt-16 w-screen'>
          {restaurant.reviews.length>0?(restaurant.reviews.map((r)=>{
            return (<div class="max-w-xs rounded-xl bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-end px-4 pt-4">
    </div>
    <div class="flex flex-col items-center pb-10 pt-4">
        <img class="mb-3 w-24 h-24 rounded-full shadow-lg mt-4" src="https://images.unsplash.com/photo-1642792735536-b6f7ef18b918?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{r.name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{r.text}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
        <Link to={'/edit'}><a onClick={()=>{setuId(r.user_id); setrId(r._id)}} class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Review</a></Link>
            <a onClick={()=>{deleteReviews(r._id,r.user_id)}} class="inline-flex items-center hover:cursor-pointer py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete</a>
        </div>
    </div>
</div>
            )
              // return (<div className='border-black rounded-lg border-4 w-1/2 h-56'>
              //   <h4 className='text-xl font-semibold mt-8'>{r.name}</h4>
              // <h4 className='text-lg mt-4'>{r.text}</h4>
              // <div className='flex justify-around items-end mt-4'>
              //   <Link to={'/edit'}><button className='border-[#fa5434] bg-[#f5ab41] border-2 px-4 py-1 rounded-xl' onClick={()=>{setuId(r.user_id); setrId(r._id)}}>Edit</button></Link>
              //   <button className='border-[#fa5434] bg-[#f5ab41] border-2 px-4 py-1 rounded-xl' onClick={()=>{deleteReviews(r._id,r.user_id)}}>Delete</button>
              // </div>
              // </div>)
            })):<h1 className='text-left'>No reviews yet</h1>
          }
          </div>
          
        </div>
        
        ):<div>No restaurants</div>
      }</div>
  )
}

export default Restaurants