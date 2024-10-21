import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  // 	const token = localStorage.getItem('Token')
  // 	if (token && token.length > 0) {
  // 		setIsLogged(true)
  // 		const decoded = jwtDecode(token)
  // 		const uname = decoded.UserName
  // 		setUserName(uname)
  // 	}
  // }, [])

  const signOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    toast.success("Çıkış Başarılı", { theme: "dark" });
    setTimeout(function () {
      window.location.assign("/");
    }, 1500);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md">
      <div
        className="d-flex align-items-center justify-content-around"
        style={{ width: "100%" }}
      >
        <div className="d-flex align-items-center justify-content-around">
          <NavbarBrand href="/" className="d-lg-none">
            <LogoWhite />
          </NavbarBrand>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <Collapse
          className="justify-content-around"
          navbar
          isOpen={true}
          style={{ width: "100%", float: "right" }}
        >
          <Nav className="justify-content-around d-none d-lg-flex" navbar>
            <NavItem>
              <Link to="/" className="nav-link">
                <i className="fab fa-facebook-f"></i> 
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/kurumsal" className="nav-link">
                <i className="fab fa-twitter"></i> 
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/urunler" className="nav-link">
                <i className="fab fa-instagram"></i> 
              </Link>
            </NavItem>
            <NavItem>
			<Link to="/iletisim" className="nav-link">
                    <i className="fab fa-youtube"></i> 
                </Link>
            </NavItem>
          </Nav>
          <Nav className="justify-content-around d-none d-lg-flex" navbar>
            <NavItem>
              <Link to="/" className="nav-link" style={{fontWeight:'bold'}}>
                Anasayfa
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/kurumsal" className="nav-link" style={{fontWeight:'bold'}}>
                Kurumsal
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/urunler" className="nav-link" style={{fontWeight:'bold'}}>
                Ürünler
              </Link>
            </NavItem>
			<NavItem>
              <Link to="/urunler" className="nav-link" style={{fontWeight:'bold'}}>
                Talep Formu
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/iletisim" className="nav-link" style={{fontWeight:'bold'}}>
                İletişim
              </Link>
            </NavItem>
          </Nav>
          {isLogged ? (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="primary" style={{ float: "right" }}>
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                  style={{ float: "right" }}
                ></img>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>{userName}</DropdownItem>
                <DropdownItem>Profil</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => signOut()}>Çıkış Yap</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Nav navbar style={{ float: "right" }}>
              <NavItem style={{ float: "right" }}>
                <Link
                  to="/Login"
                  className="nav-link"
                  style={{ float: "right" , fontWeight:'bold' }}
                >
                  Giriş Yap
                </Link>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
