import { useNavigate } from "react-router-dom";
import { converTime } from "../utilities/converTme";
import { stringRoutes } from "../utilities/routes";



export function ProductOptionCategory({ name, inStock, price, urlImage, createAt, id }: CategoryProduct) {
    const navigate = useNavigate();
    return (
        <div className="product_option_category">
            <span className="price">{inStock ? `$${price}` : 'No disponible'}</span>
            <img src={urlImage} alt={name} onClick={()=>navigate(`${stringRoutes.product}/${id}`)}/>
            <div className="area_product_info">
                <h3>{name}</h3>
                <span className="fecha">{converTime(createAt)}</span>
            </div>
        </div>
    );
}
