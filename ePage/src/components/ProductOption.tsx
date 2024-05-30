import {useNavigate} from 'react-router-dom';
import { converTime } from '../utilities/converTme';

export function ProductOption({ name, inStock, price, category, urlImage, createAt }: ProductResponse) {
  const navigate = useNavigate();
  return (
    <div className="product_option">
      <span className="price">{inStock ? `$${price}` : 'No disponible'}</span>
      <img src={urlImage} alt={name} />
      <div className="area_product_info">
        <h3>{name}</h3>
        <span className="category" onClick={()=>navigate(`/category?name=${category}`)}>{category}</span>
        <span className="fecha">{converTime(createAt)}</span>
      </div>
    </div>
  );
}
