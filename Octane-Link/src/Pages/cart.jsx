import "./cart.css"

function Cart({cart})
{
    return (
        <div className="cart-page">
            <h1>
                Your Cart
            </h1>
            <div className="cart-items">
                {cart.length == 0 && <p>Your Cart is empty.</p>}
                {cart.map((product)=>(
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>৳{product.price}</p>
                        <p>Quantity:{product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;