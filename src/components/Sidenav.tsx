

import "./css/Sidemenu.css";

import "../components/css/dashboard.css"

export default function Sidenav(props:any) {
  console.log('sidenav')
    return (
        <>
       <div
      className="offcanvas offcanvas-start sidebar-nav bg-white "
      tabIndex="-1"
      id="sidebar"
    >
      <div className="offcanvas-body p-0 ">
        <nav className="navbar-dark">
          <ul className="navbar-nav">
            <li>
              <div className="text-muted small fw-bold text-uppercase px-3">
                CORE
              </div>
            </li>
            <li>
              <a href="/dashboard" className="nav-link px-3 text-secondary text-secondaryactive text-secondary">
                <span className="me-2"><i className="bi bi-speedometer2"></i></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="my-4"><hr className="dropdown-divider bg-light" /></li>
            <li>
              <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                Interface
              </div>
            </li>
            <li>
              <a
                className="nav-link px-3 text-secondary text-secondarysidebar-link text-secondary"
                data-bs-toggle="collapse"
                href="#layouts"
              >
                <span className="me-2"><i className="bi bi-layout-split"></i></span>
                <span>Task</span>
                <span className="ms-auto">
                  <span className="right-icon">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </span>
              </a>
              <div className="collapse show" id="layouts">
                <ul className="navbar-nav ps-3 ">
                  <li>
                    <a href="/scheduled?page=1" className="nav-link px-3 text-secondary">
                      <span className="me-2 "
                        ><i className="bi bi-speedometer2"></i></span>
                      <span>Scheduled</span>
                    </a>
                  </li>
                  <li>
                    <a href="/delay?page=1" className="nav-link px-3 text-secondary">
                      <span className="me-2 "
                        ><i className="bi bi-speedometer2"></i></span>
                      <span>Delay</span>
                    </a>
                  </li>
                  <li>
                    <a href="/priority?page=1" className="nav-link px-3 text-secondary">
                      <span className="me-2"
                        ><i className="bi bi-speedometer2"></i></span>
                      <span>Priority</span>
                    </a>
                  </li>
                  <li>
                    <a href="/done?page=1" className="nav-link px-3 text-secondary">
                      <span className="me-2"
                        ><i className="bi bi-speedometer2"></i></span>
                      <span>Done</span>
                    </a>
                  </li>
                 
                </ul>
              </div>
            </li>
            <li>
              <a href="/employee?page=1" className="nav-link px-3 text-secondary">
                <span className="me-2"><i className="bi bi-book-fill"></i></span>
                <span>Company Profile</span>
              </a>
            </li>
            <li>
              <a href="/project?page=1" className="nav-link px-3 text-secondary">
                <span className="me-2"><i className="bi bi-book-fill"></i></span>
                <span>Projects</span>
              </a>
            </li>
            {/* <Show when={props.userdetail?.departmentname == "admin"}> */}
              <li className="my-4"><hr className="dropdown-divider bg-light" /></li>
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                  Create
                </div>
              </li>
              <li>
                <a href="/create" className="nav-link px-3 text-secondary">
                  <span className="me-2"><i className="bi bi-graph-up"></i></span>
                  <span>Task</span>
                </a>
              </li>
              <li>
                <a href="/account" className="nav-link px-3 text-secondary">
                  <span className="me-2"><i className="bi bi-graph-up"></i></span>
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a href="/department" className="nav-link px-3 text-secondary">
                  <span className="me-2"><i className="bi bi-graph-up"></i></span>
                  <span>Department</span>
                </a>
              </li>
              <li>
                <a href="/role" className="nav-link px-3 text-secondary">
                  <span className="me-2"><i className="bi bi-graph-up"></i></span>
                  <span>Role</span>
                </a>
              </li>
              <li>
                <a href="/addproject" className="nav-link px-3 text-secondary">
                  <span className="me-2"><i className="bi bi-graph-up"></i></span>
                  <span>Project</span>
                </a>
              </li>
            {/* </Show> */}
           

          </ul>
        </nav>
      </div>
    </div>
        </>
       

);
}