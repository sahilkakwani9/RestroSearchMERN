import React,{useState} from 'react'
import {Link} from "react-router-dom"
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
        <div><h1 className='text-4xl text-blue-400'>{props.value}</h1></div>
        <div className='block align-center justify-center'>
          <label className='block'>name</label>
          <input className='border-black border-4 block m-auto' type="text" value={name} onChange={handleNameChange}/>
          <label className='block'>User Id</label>
          <input className='border-black border-4 block m-auto' type="text" value={id} onChange={handleIdChange}/>
        <label className='block'>Review</label>
        <input className='border-black border-4 block m-auto' type="text" value={text} onChange={handleTextChange}/>
        <Link to={"/restaurants/"+reId}><button onClick={()=>{addReview();}}>Add</button></Link>
      </div>
      </div>
    )
  }
  return (
    <div>
      <div><h1 className='text-4xl text-blue-400'>{props.value}</h1></div>
      <div className='block align-center justify-center'>
        <label className='block'>Review</label>
        <input className='border-black border-4 block m-auto' type="text" value={text} onChange={handleTextChange}/>
        <Link to={"/restaurants/"+reId}><button onClick={()=>{updateReview(userId, reviewId)}}>Update</button></Link>
      </div>
    </div>
    
  )
}

export default AddReview;