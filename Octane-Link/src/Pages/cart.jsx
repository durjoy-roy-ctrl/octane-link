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
                {/* {cart.map((item)=>
                (
                    <div key={item.id}>
                        {item.name}
                    </div>
                )
                )} */}
            </div>
        </div>
    );
}

export default Cart;