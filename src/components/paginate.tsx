import { useNavigate, useSearchParams } from "react-router-dom";
import ResponsivePagination from 'react-responsive-pagination';

type Paginate = {
  row:number
};
export default function Paginate(props:Paginate) {
  const [searchParams] = useSearchParams();
  const nav = useNavigate()
 

    function handlePageChange(page) {
      // nav(`?page=${page}${searchParams.get('search')!=' '&& searchParams.get('search') != undefined? "&search="+searchParams.get('search'):' '}`)
      // location.href=`?page=${page}${searchParams.get('search')!=' '&& searchParams.get('search') != undefined? "&search="+searchParams.get('search'):' '}`
      nav(`?page=${page}${searchParams.get('search')!=' '&& searchParams.get('search') != undefined? "&search="+searchParams.get('search'):' '}`)
    }
    return (
        <div className="d-flex justify-content-between">
             <div>
             <ResponsivePagination
                current={parseInt(searchParams.get('page')== null?1:searchParams.get('page'))}
                total={Math.ceil(props.row/20)}
                onPageChange={page=>handlePageChange(page)}
              />
             </div>
             <div >
               <button type="button" className="btn border-primary position-relative">
                 {searchParams.get('page')== null?1:searchParams.get('page')} of   {Math.ceil(props.row/20)}
                   
               </button>
             </div>
             
           </div> 
    )
}