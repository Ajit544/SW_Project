import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from 'react-router-dom';
import { getPageNoFromUrl } from "../../utils";

export function FilmListPage() {
    const [ searchParam ] = useSearchParams();
    const pagNo = searchParam.get('page') || 1;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [ 'films/list', pagNo],
        queryFn: async() => {
           const res = await fetch(`https://swapi.dev/api/films/?pageNo=${pagNo}`);

            if(res.ok){
                return res.json();
            }

            return Promise.reject('Could not fetch data');
        }
    });

    const prevPage = getPageNoFromUrl(data?.previous);
    const nextPage = getPageNoFromUrl(data?.next);

    if (isLoading) {
        return (
            <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <span className= "loader"></span>
            </div>
        )
    }

    if (isError) {
        return (
            <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
              <p>{String(error)}</p>
            </div>
        )
    }

    return(
        <div>
            <h1> Film List</h1>
                <div>
                    {data?.results?.map(p =>{
                        const id = p.url
                        .replace('https://swapi.dev/api/films','')
                        .replace('/','')

                    return(
                        <p key = {id}> 
                        <Link to ={`/films/${id}`}>
                            {id}={p.title}
                        </Link>
                        </p>
                    )
                    })

                    }

                </div>

                <br/>

                <div>
                        {prevPage && <Link to = {`?page= ${prevPage}`}>previous</Link>}

                        <br/>

                        {nextPage && <Link to = {`?page= ${nextPage}`}>next</Link>}
                </div>
        </div>
    )
}