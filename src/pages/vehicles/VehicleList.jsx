import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getPageNoFromUrl } from '../../utils'; 

export function VehicleListPage () {
    const [searchParam,setSearchParam ] = useSearchParams();
      const pageNo = searchParam.get('page') || 1;
      const search = searchParam.get('search') || '';

    const { data, isLoading, error, isError } = useQuery({
        queryKey:['vehicles/list', search, pageNo], 
        queryFn: async() => { 
            const res = await fetch(`https://swapi.dev/api/vehicles/?page=${pageNo}&search=${search}`);

        if(res.ok){
            return res.json();
        }

        return Promise.reject('Could not fatch data');
    }
    });

    const prevPage = getPageNoFromUrl(data?.previous);
    const nextPage = getPageNoFromUrl(data?.next);
    //console.log(data);

    
    
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
        );
      }

      return (
        <div>
            <h1>Vehicle List</h1>
            <input 
              placeholder="Search..."
              value={search}
              onChange={e => {
                const sp = new URLSearchParams(searchParam);
                sp.set('page', 1);
                sp.set('search',e.target.value);

                setSearchParam(sp);
              }}
              
              />
              
             
              {isLoading ? (
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="loader"></span>
                  </div>
                ): (
                  <>
                <div>
                {data?.results?.map(p => {
                    const id = p.url 
                    .replace('https://swapi.dev/api/vehicles/','')
                    .replace('/','')
                
                return(
                <p key={id}>
                    <Link to={`/vehicles/${id}`}>
                        {id} = {p.name}
                    </Link>
                </p>
                )
                })}
            </div>
            <br/>
            <div>
            {prevPage && (
            <Link to={`?page=${prevPage}&search=${search}`}>Prev</Link>
            )}

            <br />

            {nextPage && (
            <Link to={`?page=${nextPage}&search=${search}`}>Next</Link>
            )}
            </div>
            </>
            )}
        </div>
      );

}