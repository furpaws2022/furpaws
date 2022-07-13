import React from 'react'
import{useSelector}from "react-redux";
const Checkout = () => {
    const {products, totalQuantities,totalPrice}=useSelector(state => state.CartReducer);
  return (
    <div className='C_form'>
        <div className="C_row">
  <div className="C_col-75">
    <div className="C_container">
      <form >

        <div className="C_row">
          <div className="C_col-50">
            <h3  style={{padding:'20px'}}>Billing Address</h3>
            <label for="fname"><i className="fa fa-user"></i> Full Name</label>
            <input type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
            <label for="email"><i className="fa fa-envelope"></i> Email</label>
            <input type="text" id="email" name="email" placeholder="john@example.com"/>
            <label for="phone"><i className="fa fa-phone"></i> Phone</label>
            <input type="text" id="email" name="email" placeholder="+11-912345678"/>
            <label for="adr"><i className="fa fa-address-card"></i> Address</label>
            <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
            {/* <label for="city"><i className="fa fa-institution"></i> City</label>
            <input type="text" id="city" name="city" placeholder="New York"/> */}

            <div className="C_row">
              <div className="C_col-50">
                <label for="state">State</label>
                <input type="text" id="state" name="state" placeholder="NY"/>
              </div>
              <div className="C_col-50">
                <label for="zip">Zip</label>
                <input type="text" id="zip" name="zip" placeholder="10001"/>
              </div>
            </div>
          </div>

          <div className="C_col-50">
            <h3 style={{padding:'20px'}} >Payment</h3>
            <label for="fname">Accepted Cards</label>
            <div className="C_icon-container">
            <i class="fa-brands fa-cc-visa" style={{color:'blue',padding:'5px'}}></i>
              <i className="fa-brands fa-cc-mastercard" style={{color:'red'}}></i>
           
            </div>
            <label for="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
            <label for="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
            <label for="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="September"/>

            <div className="C_row">
              <div className="C_col-50">
                <label for="expyear">Exp Year</label>
                <input type="text" id="expyear" name="expyear" placeholder="2018"/>
              </div>
              <div className="C_col-50">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="352"/>
              </div>
            </div>
          </div>

        </div>
        <label>
          <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
        </label>
        <input type="submit" value="Continue to checkout" className="C_btn"/>
      </form>
    </div>
  </div>

  <div className="C_col-25" >
    <div className="C_container"  >
      <h3><strong>Cart</strong>
        <span className="C_price" style={{color:'tomato'}}>
          <i className="fa fa-shopping-cart"></i>
          <b>{totalQuantities}</b>
        </span>
      </h3>
    
      {products.map(product=>(
               <p>{product.name} <span className="C_price">{product.discountPrice}</span></p>
               
              ))}
      <hr class="solid"></hr>
      <p><strong>Total</strong> <span className="C_price" style={{color:'black'}}><b>{totalPrice}</b></span></p>
    </div>
  </div>
</div>

    </div>
    
  )
}

export default Checkout