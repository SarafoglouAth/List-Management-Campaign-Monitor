import { ProgressSpinner } from 'primereact/progressspinner';


const Loader = () => {
    return (
        <div className="m-auto flex justify-content-center py-8">
           <ProgressSpinner />
        </div>
    );
};

export default Loader;