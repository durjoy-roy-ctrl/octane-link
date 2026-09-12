import "./cart.css"
import shellHelix from "../assets/images/products/shell-helix-hx8.jpg";
import mobil1 from "../assets/images/products/mobil-1-fs.jpg";
import castrolEdge from "../assets/images/products/castrol-edge.jpg";
import motul8100 from "../assets/images/products/motul-8100.jpg";
import tempora from "../assets/images/products/Kronos-Tempora.jpg";
import adnoc from "../assets/images/products/Adnoc-Voyeger.jpg";

const imageMap = {
  "shell-helix-hx8.jpg": shellHelix,
  "mobil-1-fs.jpg": mobil1,
  "castrol-edge.jpg": castrolEdge,
  "motul-8100.jpg": motul8100,
  "Kronos-Tempora.jpg": tempora,
  "Adnoc-Voyeger.jpg": adnoc,
};

function Cart({cart,removeFromCart,increaseQuantity,decreaseQuantity})
{
    const totalPrice = cart.reduce(
        (total,product)=>
            total + product.price*product.quantity,
        0
    );
    return (
        <div className="cart-page">
            <h1>
                Your Cart
            </h1>
            <div className="cart-items">
                {cart.length == 0 && <p>Your Cart is empty.</p>}
                {cart.map((product)=>{
                    const productImage = imageMap[product.image];

                    return(
                    <div className="cart-item" key={product._id}>
                        <img src={productImage} alt={product.name} className="cart-item-image" />
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
        </div>
    );
}

export default Cart;