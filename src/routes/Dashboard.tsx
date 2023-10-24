
import { Suspense, useEffect, useState } from "react";
import Body from "../components/body";

export default function Dashboard() {
  console.log("dashboard")
  const [projid, setprojid] = useState(0);
  const [cuser, setcuser] = useState('');
  const [arrprojectstat, setarrprojectstat] = useState([]);
  const [arrviewproj, setviewproj] = useState([]);
  const [arrrow, setrow] = useState([]);
  const [arrrowprio, setrowprio] = useState([]);
  const [arrrowdone, setrowdone] = useState([]);
  const [arrrowdelay, setrowdelay] = useState([]);
  const [topachiever, settopachiever] = useState([]);
  useEffect( () => {
    setcuser(document.cookie != '' ? JSON.parse(document.cookie?.slice(10)).id : '');
    if(cuser!=''){
      fetch(
        `http://localhost:4000/projectStatus?user=` + cuser, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      ).then(async (data)=>{
        setarrprojectstat( await data.json());
      })
    }
  },[cuser]);

  useEffect(()=>{
    if (projid != 0 && cuser != '') {
      fetch(
        `http://localhost:4000/viewproj?user=` +cuser, {
        method: 'POST',
        body: JSON.stringify({
          projid: projid
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(async (data)=>{
        setviewproj(await data.json())
      })
    
    } 
  },[projid,cuser])

  useEffect(()=>{
    if (cuser != '') {
          fetch(
            `http://localhost:4000/scheduledrow`, {
            method: 'POST',
            body: JSON.stringify({
              search: "",
              user: cuser
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then(async (data)=>{
            setrow(await data.json())
          })
        } 
  },[cuser])
  useEffect(()=>{
    if (cuser != '') {
          fetch(
            `http://localhost:4000/priorityrow`, {
            method: 'POST',
            body: JSON.stringify({
              search: "",
              user: cuser
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then(async (data)=>{
            setrowprio(await data.json())
          })
        } 
  },[cuser])
  useEffect(()=>{
    if (cuser != '') {
          fetch(
            `http://localhost:4000/donerow`, {
            method: 'POST',
            body: JSON.stringify({
              search: "",
              user: cuser
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then(async (data)=>{
            setrowdone(await data.json())
          })
        } 
  },[cuser])
  useEffect(()=>{
    if (cuser != '') {
          fetch(
            `http://localhost:4000/delayrow`, {
            method: 'POST',
            body: JSON.stringify({
              search: "",
              user: cuser
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then(async (data)=>{
            setrowdelay(await data.json())
          })
        } 
  },[cuser])
  useEffect(()=>{
    if (cuser != '') {
      fetch(
        `http://localhost:4000/topAchiever?user=` + cuser, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(async (data)=>{
        settopachiever(await data.json())
      })

    }
  },[cuser])

  return (
    <Body>
      <main className="mt-5 pt-3">
        <div className="container-fluid">

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card bg-primary text-white h-100">
                <a href="/scheduled?page=1" className="nav-link">
                  <Suspense fallback={<div className="card-body py-5">loading</div>}>
                    <div className="card-body py-5">{arrrow}</div>
                  </Suspense>
                  <div className="card-footer d-flex">
                    Scheduled
                    <span className="ms-auto">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>

                </a>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-warning text-dark h-100">
                <a href="/delay?page=1" className="nav-link">
                  <Suspense fallback={<div className="card-body py-5">loading</div>}>
                    <div className="card-body py-5">{arrrowdelay}</div>
                  </Suspense>
                  <div className="card-footer d-flex">
                    Delay
                    <span className="ms-auto">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-danger text-white h-100">
                <a href="/priority?page=1" className="nav-link">
                  <Suspense fallback={<div className="card-body py-5">loading</div>}>
                    <div className="card-body py-5">{arrrowprio}</div>
                  </Suspense>
                  <div className="card-footer d-flex">
                    Priority
                    <span className="ms-auto">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-3 mb-3">

              <div className="card bg-success text-white h-100">
                <a href="/done?page=1" className="nav-link">
                  <Suspense fallback={<div className="card-body py-5">loading</div>}>
                    <div className="card-body py-5">{arrrowdone}</div>
                  </Suspense>
                  <div className="card-footer d-flex">
                    Done
                    <span className="ms-auto">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>


            </div>



          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <span className="me-2"><i className="bi bi-bar-chart-fill"></i></span>
                  Monthly Top Achiever
                </div>
                <div className="card-body d-flex justify-content-center">
                  <Suspense fallback={<p>Loading...</p>}>
                  {topachiever.map((e) => (
                     <div className="card" style={{width:"14rem"}}>
                     <img src={'http://localhost:4000/public/account/' + e.id + '.png'} className="card-img-top img-fluid" onError={({ currentTarget }) => {
                       currentTarget.onerror = null; // prevents looping
                       currentTarget.src = "/profile.png";
                     }} alt="..." style={{ minHeight: "190px", maxHeight: "190px" }} />
                     <div className="card-body">
                       <h5 className="card-title">{e.name}</h5>
                       <h6 className="card-subtitle mb-2 text-muted">{e.rolename} </h6>
                       <h6 className="card-subtitle mb-2 text-muted">{e.departmentname} </h6>
                       <a href={`/employee/${e.id}`} className="btn btn-primary">Details</a>
                     </div>
                   </div>
                  ))}
                  </Suspense>

                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <span className="me-2"><i className="bi bi-bar-chart-fill"></i></span>
                  Project Status
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionExample">
                   <Suspense fallback={<p>Loading...</p>}> 
                   {arrprojectstat.map((e,index) => (
                      <div className="accordion-item" key={index}>
                      <h2 className="accordion-header " id="headingOne">

                        <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + e.id} aria-expanded="true" aria-controls="collapseOne" onClick={() => { setprojid(e.id); }}>
                          {e.projectname}
                        </button>
                      </h2>
                      <div id={"collapse" + e.id} className="accordion-collapse collapse text-left" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          {arrprojectstat.legnth!=0?
                          <> 
                            {arrviewproj.map((e,index) => (
                               <a href={`/project/` + projid} className="nav-link" key={index}>
                               <ul>
                                 <li>Today schedule is over {e.totalsched} task</li>
                                 <li>Total Priority is over {e.totalprio} task</li>
                                 <li>Total Delay is over {e.totaldelay} task</li>
                                 <li>Done is over {e.totaldone} task</li>
                               </ul>
                             </a>
                            ))}
                          </>
                          :<></>
                          }
                        </div>
                      </div>
                    </div>
                    ))}

                      </Suspense> 
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

    </Body>

  );
}
