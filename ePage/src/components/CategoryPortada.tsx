
export function CategoryPortada({urlImage, name}:AddCategory) {
  return (
    <div className="portada_category" style={{backgroundImage:`url(${urlImage})`}}>
        <h2 className="titulo">{name}</h2>
        <p>Los mejores productos los  encuentras aquí</p>
    </div>
  );
}
