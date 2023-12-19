import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function VehicleDetailPage() {
    const { id = '1'} = useParams();
    const { data, isLoading, error, isError} = useQuery({
        queryKey: ['vehicles/details', id],
        queryFn: async() => {
            const res = await fetch(`https://swapi.dev/api/vehicles/${id}`);

            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Could not fetch data');
        }
    });

    if (isLoading){
        return (
            <div 
            style={{
                height: '100%',
                display: 'flex',
                alignItem: 'center',
                justifyContent:'center'
            }}
            >
                <span className="loader"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div 
            style={{
                height: '100',
                display: 'flex',
                alignItems: 'center',
                justiContent: 'center'
            }}
            >
            <p>{String(error)}</p>   
            </div>
        );
    }

    return(
        <div>
           <h1>Vehicles Details</h1>
            <h4>{data.name}</h4>
            <p>Model: {data.model }</p>
            <p>Vehicle class: {data.vehicle_class }</p>
            <p>Manufacturer: {data.manufacturer }</p> 
        </div>
    );
}