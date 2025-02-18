import React, { useContext, useState } from 'react';
import Nav from '../Comp/Nav';
import Categories from '../Category';
import Card from '../Comp/Card';
import { food_items } from '../food';
import { dataContext } from '../Contex/UserContex';
import { RxCross2 } from "react-icons/rx";
import { BsTranslate } from 'react-icons/bs';
import Card2 from '../Comp/Card2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Home() {
  let { cat, setCat, input, showCart, setShowCart } = useContext(dataContext)

  function filter(category) {
    if (category === "All") {
      setCat(food_items);
    } else {
      let newList = food_items.filter((item) => (item.food_category === category));
      setCat(newList);
    }
  }

  let items = useSelector(state => state.cart)

  let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
  let deliveryFee = 20;
  let taxes = subtotal * 0.5 / 100;
  let total = Math.floor(subtotal + deliveryFee + taxes);

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav />
      {!input ? <div className='flex flex-wrap justify-center items-center gap-5 w-[100%]'>
        {Categories.map((item) => (
          <div key={item.id} className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={() => filter(item.name)}>
            <div>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div> : null}

      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {cat.length>1?cat.map((item) => (
          <Card key={item.id} name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
        )):<div  className='text-centert text-2xl text-green-500 font-semibold pt-5'>No dish Found</div>}
        
      </div>
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className='w-[100%] flex justify-between items-center'>
          <span className='text-green-400 text-[18px] font-semibold'>Order Items</span>
          <RxCross2 className='text-green-400 text-[18px] font-semibold w-[30px] h-[30px] hover:text-gray-600 cursor-pointer' onClick={() => setShowCart(false)} />
        </header>
        {items.length>0?  <>
        <div className='w-full mt-9 flex flex-col gap-8 '>
          {items.map((item) => (
            <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
          ))}

        </div>
        <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>Subtotal</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {subtotal}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>Delivery Fee</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {deliveryFee}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>Taxes</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {taxes}/-</span>
          </div>
        </div>
        <div className='w-full flex justify-between items-center p-9'>
            <span className='text-2xl text-gray-600 font-semibold'>Total</span>
            <span className='text-green-400 font-semibold text-2xl'>Rs {total}/-</span>
          </div>
       <button className='w-[80%] p-3 bg-green-500 rounded-lg text-white hover:bg-green-400 transition-all cursor-pointer' onClick={()=>{toast.success("Order Place")}}>Place Order</button>
       </>: <div className='text-centert text-2xl text-green-500 font-semibold pt-5'>Empty Card</div>}
       
      </div>
    </div>
  );
}

export default Home;