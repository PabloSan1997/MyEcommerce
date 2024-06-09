/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";


export  function ImagenesArea({imagenes, className}:{imagenes:string[], className:string}) {
    const theImages = imagenes.map((im, id) => ({url:im, id}));
    const [imageSelect, setImageSelect] = useState(theImages[0]?theImages[0]:{url:'', id:0});
    useEffect(()=>{
        setImageSelect(theImages[0]);
    },[imagenes[0]]);
    
   
  return (
    <div className={className}>
        <div className="imagenes">
            {theImages.map((im) => (
                <img 
                src={im.url} 
                alt=""
                 key={im.id} 
                 onClick={()=> setImageSelect(im)} 
                 className={imageSelect.id == im.id?'img_select':''}/>
            ))}
        </div>
        <img src={imageSelect.url} alt="" className="main_image"/>
    </div>
  );
}
