/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";


export  function ImagenesArea({imagenes, className}:{imagenes:string[], className:string}) {
    const theImages = imagenes.map((im, id) => ({url:im, id}));
    const [imageSelect, setImageSelect] = useState({id:0, url:''});
    useEffect(()=>{
        setImageSelect(theImages[0]);
    },[imagenes.length]);
    
   
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
