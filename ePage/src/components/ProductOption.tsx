import {useNavigate} from 'react-router-dom';
import { converTime } from '../utilities/converTme';
import { stringRoutes } from '../utilities/routes';

export function ProductOption({ name, inStock, price, category, urlImage, createAt, id }: ProductResponse) {
  const navigate = useNavigate();
  return (
    <div className="product_option">
      <span className="price">{inStock ? `$${price}` : 'No disponible'}</span>
      <img src={urlImage} alt={name} onClick={()=>navigate(`${stringRoutes.product}/${id}`)}/>
      <div className="area_product_info">
        <h3 onClick={()=>navigate(`${stringRoutes.product}/${id}`)}>{name}</h3>
        <span className="category" onClick={()=>navigate(`/category?name=${category}`)}>{category}</span>
        <span className="fecha">{converTime(createAt)}</span>
      </div>
    </div>
  );
}
