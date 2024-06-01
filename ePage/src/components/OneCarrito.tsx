

export function OneCarrito({total, price, products, totalPrice}:CarritoRespnse) {
    const {name} = products;
  return (
    <div className="carrito_option">
        <h3>{name}</h3>
        <span className="total">Total: {total}</span>
        <span className="price">Precio: ${price}</span>
        <span className="total_price">Total a pagar: ${totalPrice}</span>
    </div>
  );
}
