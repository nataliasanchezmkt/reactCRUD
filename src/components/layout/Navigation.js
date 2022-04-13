import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navigation = () => {
  let session = JSON.parse(sessionStorage.getItem("stateSession") || false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (session) {
      session = false;
      sessionStorage.setItem("stateSession", JSON.stringify(session));
     
 
      let timerInterval;
      Swal.fire({
        title: "Cerrando sesion",
        
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/");
        }
      });
    }
  };
  return (
    <div>
      <Navbar className="bg-yellow" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            Crud Cafetería
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto color-nav">
              {session ? (
                <>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/productTable">
                    Products
                  </Link>
                  <Link onClick={handleLogOut} className="nav-link" to="/login">
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
