import cv from "../assets/Sarafoglou_Thanos_Cv.jpg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
const Cv = () => {
   
    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = cv;
        link.download = 'Sarafoglou_Thanos_Cv.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
 return (
 <div className="flex flex-column gap-2">
       <Button  className="w-1 ml-auto" icon="pi pi-download" onClick={downloadImage}/>
    <Image src={cv} alt="cv" width="100%" height="100%"  />

 </div>
 );
};
export default Cv;
