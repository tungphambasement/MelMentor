import './navbar.scss'
export default function Navbar() {
    return (
    <div>
        <nav class="navbar bg-body-tertiary fixed-top">
                      <div class="container-fluid">
                        <a class="navbar-brand" href="#" style={{fontFamily : "Times New Roman"}}>
                        MelMentor
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                          <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MelMentor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                          <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                              <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">Profile</a>
                              </li>
                            </ul>
                            <form class="d-flex mt-3" role="search">
                              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                              <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
{/*                             <div class="group"> */}
{/*                                         <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon"> */}
{/*                                             <g> */}
{/*                                                 <path */}
{/*                                                     d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" */}
{/*                                                 ></path> */}
{/*                                             </g> */}
{/*                                         </svg> */}

{/*                                         <input */}
{/*                                             id="query" */}
{/*                                             class="input" */}
{/*                                             type="search" */}
{/*                                             placeholder="Search..." */}
{/*                                             name="searchbar" */}
{/*                                         /> */}
{/*                                     </div> */}
                          </div>
                        </div>
                      </div>
                    </nav>

        </div>
    );
}