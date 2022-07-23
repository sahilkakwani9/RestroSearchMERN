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
  <div className='flex justify-between mt-4 bg-gray-100 px-4'>
    <div className='mt-4'>
    <input className='border-2 rounded-lg border-black mr-4 pl-2' type="text" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} />
    <button className="border-lime-400 border-2 px-2 py-1 rounded-xl text-sm" type="button" onClick={findByName}>Search</button>
    </div>
    <div className='mt-4'>
    <input className='border-2 rounded-lg border-black mr-4 pl-2' type="text" placeholder="Search by zip" value={searchZip} onChange={onChangeSearchZip} />
    <button className="border-lime-400 border-2 px-2 py-1 rounded-xl text-sm" type="button" onClick={findByZip}>Search</button>
    </div>
    <div className='mt-4'>
            <select onChange={onChangeSearchCuisine} className='mr-4'>
                 {cuisines.map(cuisine => {
                    return (
                    <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                    )
                })}
            </select>
            <button
              type="button"
              className='border-lime-400 border-2 px-2 py-1 rounded-xl text-sm'
              onClick={findByCuisine}
            >
              Search
            </button>
            </div>
  </div>
    <div className='grid grid-cols-3 bg-gray-100'>
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