import React,{useState} from 'react'
import useStore from "../store/store"
import RestaurantDataService from "../services/restaurant";

function AddReview(props) {
  const state = useStore();
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState(null);
  const userId = state.user_id;
  const reviewId = state.reviewId;
  const reId = state.reId;

  const handleTextChange = (e)=>{
    const newText = e.target.value;
    setText(newText);
  }

  const handleNameChange = (e)=>{
    const name = e.target.value;
    setName(name);
  }
  const handleIdChange = (e)=>{
    const id = e.target.value;
    setId(id);
  }

  const addReview = () =>{
    const data = {
      text: text,
      name: name,
      user_id: id,
      restaurant_id: reId
    }

    RestaurantDataService.createReview(data)
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
     });
  }

  const updateReview = (userId,reviewId) =>{
    // RestaurantDataService.updateReview(userId,reviewId,text)
    const data = {
      user_id: userId,
      review_id: reviewId,
      text: text
    }
    RestaurantDataService.updateReview(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
       });
  }

  console.log(userId)
  if(props.value == "Add Review"){
    return (
      <div>
        <div><h1 className='text-4xl font-bold text-blue-400 mt-16'>{props.value}</h1></div>
        <div class="max-w-2xl mt-8 mx-auto text-left">
  

		<div class="relative z-0 mb-9 w-full group">
			<input value={name} onChange={handleNameChange}  type="text" autoComplete='off' name="floating_name" class="block ml-4 py-2.5 px-0 w-80 sm:text-black lg:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_name" class="absolute text-md ml-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9">Your Name</label>
		</div>
		<div class="relative z-0 mb-9 w-full group">
			<input value={id} onChange={handleIdChange} autoComplete='off' type="text" name="floating_userid" id="floating_password" class="block ml-4 py-2.5 px-0 w-80 sm:text-black lg:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_userid" class="absolute text-md ml-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9">User ID</label>
		</div>
		<div class="relative z-0 mb-9 w-full group">
			<input value={text} onChange={handleTextChange} autoComplete="off" type="text" name="repeat_review" id="floating_repeat_password" class="block ml-4 py-2.5 px-0 w-80 sm:text-black lg:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_review" class="absolute text-md ml-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9">Review</label>
		</div>
		<button onClick={()=>{addReview();window.history.back()}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
</div>
      </div>

    )
  }
  return (
    <div>
      <div><h1 className='text-4xl text-blue-400 font-bold mt-12'>{props.value}</h1></div>
      {/* <div className='block align-center justify-center'>
        <label className='block'>Review</label>
        <input className='border-black border-4 block m-auto' type="text" value={text} onChange={handleTextChange}/>
        <button onClick={()=>{updateReview(userId, reviewId); window.history.back()}}>Update</button>
      </div> */}
      <div class="max-w-2xl mt-8 mx-auto text-left">
  
      <div class="relative z-0 mb-9 w-full group">
			  <input value={text} onChange={handleTextChange} type="text" autoComplete='off' name="repeat_review" id="floating_repeat_password" class="block ml-4 py-2.5 px-0 w-80 lg:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			  <label for="floating_review" class="absolute text-md ml-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9">Review</label>
		  </div>
		  <button onClick={()=>{updateReview(userId, reviewId); window.history.back()}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
      </div>
    </div>
    
  )
}

export default AddReview;