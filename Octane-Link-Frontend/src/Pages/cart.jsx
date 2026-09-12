import "./cart.css"
import { useNavigate } from 'react-router-dom'


function Cart({cart,removeFromCart,increaseQuantity,decreaseQuantity})
{
    const totalPrice = cart.reduce(
        (total,product)=>
            total + product.price*product.quantity,
        0
    );
    const navigate = useNavigate();
    return (
        <div className="cart-page">
            <h1>
                Your Cart
            </h1>
            <div className="cart-items">
                {cart.length == 0 && <p>Your Cart is empty.</p>}
                {cart.map((product)=>{

                    return(
                    <div className="cart-item" key={product._id}>
                        <img
                        src={product.image?.url}
                        alt={product.name}
                        className="cart-item-image"
                        />
                        <h3>{product.name}</h3>
                        <p>৳{product.price}</p> 
                        <p>Quantity:{product.quantity}</p>
                        <button onClick={()=> removeFromCart(product._id)}>
                            Remove
                        </button>
                        <button onClick={()=> increaseQuantity(product._id)}>
                            +
                        </button>
                        <button onClick={()=>decreaseQuantity(product._id)}>
                            -
                        </button>
                    </div>
                )})}
            </div>
            <div className="cart-total">
                <h2>
                    Total: ৳{totalPrice} 
                </h2>
            </div>
            <button
            onClick={() => navigate('/sell')}
            className="sell-fuel-button"
            >
            CHECKOUT
            </button>
        </div>
    );
}

export default Cart;