
import { Button } from 'primereact/button';
import clearAllCookies from "../../hooks/clearAllCookies.js";


const CookiesResetButton = () => {

    const deleteCCCookies = true;

    return (
        <div className='w-full flex justify-content-center pt-3'>
        <Button onClick={()=>clearAllCookies(deleteCCCookies)}  severity='danger' >Reset Cookies</Button>
        </div>
    );
};

export default CookiesResetButton;