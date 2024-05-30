import { converTime } from "../utilities/converTme";



export function ProductOptionCategory({ name, inStock, price, urlImage, createAt }: CategoryProduct) {
    return (
        <div className="product_option_category">
            <span className="price">{inStock ? `$${price}` : 'No disponible'}</span>
            <img src={urlImage} alt={name} />
            <div className="area_product_info">
                <h3>{name}</h3>
                <span className="fecha">{converTime(createAt)}</span>
            </div>
        </div>
    );
}
