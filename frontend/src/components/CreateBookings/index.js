import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import dag from './dag.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { create_booking_thunk } from "../../store/bookings";
export default function CreateBooking(){
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const [paymentOption, setPaymentOption] = useState('credit card')
    const [submitting, setSubmitting] = useState(false)
    const [validationErrors,setValidationErrors] =useState([])
    const history = useHistory()

    
    const [formData,setFormData] = useState({
        startDate:null,
        endDate:null
    })

    const handleChange=(e)=>{
        setPaymentOption(e.target.value)
    }
    const handleFormChange = (event) => {
        setFormData({...formData,[event.target.name]:event.target.value})
    }
    
    const handleDateChange = (date,field) => {
        if (date) {
            const formattedDate = date.toISOString().slice(0, 10);
            setFormData({ ...formData,[field]:date});
        }

    };
    // const handleEndDateChange = (date) =>{
    //     if(date){
    //         const formattedDate = date.toISOString().slice(0,10)
    //         setFormData({...formData,endDate:date,formattedDate})
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        const newBooking = {
            startDate:formData.startDate,
            endDate:formData.endDate
        }
      
       let booked = await dispatch(create_booking_thunk(spotId,newBooking))
        
       .catch(
           async (res) => {
               const data = await res.json();
               let errors= []
               if (data && data.errors) {
                
                   setValidationErrors(data.errors);
                   
               }
              
               return
           }
       )
   if(booked) history.push('/users/current')
       
       
    // if(!validationErrors.length>0) history.push('/spots/current')

    }

    return (
        <div className="forBook">
            <h1>AIR-WE</h1>
            <h3>Choose date and payment options!</h3>
            <img className="forBookImg" src={dag} ></img>
            <form className="create-booking-form" onSubmit={handleSubmit} >
                <ul>
                    {validationErrors?.map((error, idx) => (
                        <li style={{ color: 'red', listStyle:'none' }} key={idx}>{error}</li>
                    ))}
                </ul>
                <label className="dateid">
                    Start Date:
                    <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => handleDateChange(date, "startDate")}
                        required
                    />
                </label>
                <label className="dateid">
                    End Date:
                    <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => handleDateChange(date, "endDate")}
                        required
                    />
                </label>
             
            
                <div className="forChangeB" >
                    <input type='radio' id='credit-card' name='payment-option' value='credit card' checked={paymentOption === 'credit card'} onChange={handleChange} />
                    <label htmlFor='credit-card' >Credit Card</label>
                </div>
                <div className="forChangeB" >
                    <input type='radio' id='paypal' name='payment-option' value='paypal' checked={paymentOption === 'paypal'} onChange={handleChange} />
                    <label htmlFor='paypal' >PayPal</label>
                </div>
                <div className="forChangeB" >
                    <input type='radio' id='bitcoin' name='payment-option' value='bitcoin' checked={paymentOption === 'bitcoin'} onChange={handleChange} />
                    <label htmlFor='bitcoin' >Bitcoin</label>
                </div>
                <button className='membutton' onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )
}