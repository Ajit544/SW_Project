import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getPageNoFromUrl } from '../../utils';

export function PeopleListPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const pagNo = searchParam.get('page') || 1;
 const search = searchParam.get('search') || '';
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['people/list', search, pagNo],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/people/?page=${pagNo}&search=${search}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  const prevPage = getPageNoFromUrl(data?.previous);
  const nextPage = getPageNoFromUrl(data?.next);
  console.log(data);
  //const count = count;
  //const p= Math.ceil(data.count/10);
  //console.log(p);

  /*if (isLoading) {
    return (
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
    );
  }*/

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
        <h1>People List</h1>
          <input 
            placeholder='Search...'
            value={search}
            onChange={e => {
                const sp = new URLSearchParams(searchParam);
                sp.set('page',1);
                sp.set('search',e.target.value);

                setSearchParam(sp);
              }}
          />

      {isLoading ? (
        <div 
        style={{
                heigth:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
        }}
        >
          <span className='loader'></span>

        </div>
        ) : (
          <>
       
      <div>
        {data?.results?.map(p => {
          const id = p.url
            .replace('https://swapi.dev/api/people/', '')
            .replace('/', '');

          return (
            <li key={id}>
              <Link to={`/people/${id}`}>
                {id} -{p.name}
                </Link>
            </li>
          );
        })}
      </div>
      <div>
        {prevPage && 
        <Link to={`?page=${prevPage}&search=${search}`}>Prev</Link>}

        /*{ Array(9).fill(0).map((i,p) => {
          return <Link to = {`/people?page=${p+1}`}> {p+1}  </Link>
        })} */

        {nextPage && 
        <Link to={`?page=${nextPage}&search=${search}`}>Next</Link>}
      </div>
      </>
        )}
    </div>
  );
}
