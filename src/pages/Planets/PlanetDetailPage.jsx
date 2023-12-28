import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function PlanetDetailPage(){
    const { id = '1'} = useParams();
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['planet/details', id],
        queryFn: async() => {
            const res = await fetch(`https://swapi.dev/api/planets/${id}`);

            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Could not fetch data');
        }
    });

    if(isLoading){
        return (
            <div 
            style={{
                height: '100%',
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'center'
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
                    justifyContent: 'center'
                }}
                >
                    <p>{String(error)}</p>
                </div>
        );
    }

    return(
        <div>
            <h1>Planets Details</h1>
            <h3>{data.name}</h3>
            <p>Diameter: {data.diameter}</p>
            <p>Rotation_period: {data.rotation_period}</p>
            <p>orbital_period: {data.orbital_period}</p>
            <p>gravity: {data.gravity}</p>
            <p>population:{data.population}</p>
            <p>climate: {data.climate}</p>
            <p>terrain: {data.terrain}</p>
            <p>surface_water: {data.surface_water}</p>
            <p>residents: {data.residents}</p>
            <p>films: {data.films}</p>
            <p>url: {data.url}</p>
            <p>created : {data.created}</p>
            <p>edited : {data.edited }</p>

        </div>
    );
}