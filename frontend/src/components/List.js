import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import RestaurantDataService from "../services/restaurant";

function List(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName ] = useState("");
    const [searchZip, setSearchZip ] = useState("");
    const [searchCuisine, setSearchCuisine ] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);

    useEffect(() => {
        retrieveRestaurants();
        retrieveCuisines();
    }, [])

    const refreshList = () => {
        retrieveRestaurants();
      };

    const find = (query, by)=>{
        RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName)
    }

    const onChangeSearchZip = (e)=>{
        const searchZip = e.target.value;
        setSearchZip(searchZip)
    }

    const onChangeSearchCuisine = (e)=>{
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine)
    }


    const findByName =  () => {
        find(searchName, "name")
    }

    const findByZip = () => {
        find(searchZip, "zipcode")
    }

    const findByCuisine = ()=>{
        if (searchCuisine == "All Cuisines") {
            refreshList();
          } else {
            find(searchCuisine, "cuisine")
          }
    };
    
    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
          .then(response => {
            console.log(response.data);
            setRestaurants(response.data.restaurants);
            
          })
          .catch(e => {
            console.log(e);
          });
      };
      const retrieveCuisines = () => {
        RestaurantDataService.getCuisines()
          .then(response => {
            console.log(response.data);
            setCuisines(["All Cuisines"].concat(response.data));
            
          })
          .catch(e => {
            console.log(e);
          });
      };
  return (<>
  <div className='flex justify-around pt-4 bg-gray-100 h-full px-4'>
  <div class="flex items-center pt-4 md:ml-8">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Name" value={searchName} onChange={onChangeSearchName} required/>
        </div>
        <button type="submit" onClick={findByName} class="p-2.5 ml-6 md:ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
    </div>
    <div class="hidden md:flex items-center mt-4 mr-8">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Zip" value={searchZip} onChange={onChangeSearchZip} required/>
        </div>
        <button type="submit" onClick={findByZip} class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
    </div>
    <div className='hidden md:block mt-4 mr-8'>
            <select onChange={onChangeSearchCuisine} className='mr-4 p-2'>
                 {cuisines.map(cuisine => {
                  console.log(cuisines)
                    return (
                    <option value={cuisine}> {cuisine} </option>
                    )
                })}
            </select>
            <button type="submit" onClick={findByCuisine} class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            </div>
  </div>
    <div className='block md:grid grid-cols-3 pt-4 bg-gray-100'>
        {
            
            restaurants.map((r)=>{
                const address = `${r.address.building} ${r.address.street}, ${r.address.zipcode}`;
                return (<div class="m-8 bg-gray-100 flex justify-center items-center">
                <div class="w- p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <img class="w-64 object-cover rounded-t-md" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" />
                  <div class="mt-4">
                    <h1 class="text-2xl font-bold text-gray-700">{r.name.substr(0,20)}</h1>
                    <p class="text-sm mt-2 text-gray-700">{r.cuisine}</p>
                    
                    <div class="mt-4 mb-2 flex justify-center pl-4 pr-2">
                      <button class="block text-sm w-24 font-semibold text-gray-700 cursor-auto">{address}</button>
                    </div>
                    <div className='flex justify-between'>
                    <a href={"https://www.google.com/maps/place/" + address}><button class="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300">View</button></a>
                    <Link to={"/restaurants/"+r._id}><button class="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300">Review</button></Link>
                    </div>
                  </div>
                </div>
              </div>)
            })
        }
    </div></>
    
  )
}

export default List