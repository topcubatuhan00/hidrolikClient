import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

const navigation = [
	{
		title: "Ana Sayfa",
		href: "/",
		icon: "bi bi-house-door-fill h3 mb-0",
	},
	{
		title: "Görevlerim",
		href: "/mytasks",
		icon: "bi bi-list-task h3 mb-0",
	},
];

const adminNavigation = [
	{
		title: "Görev Ekle",
		href: "/taskadd",
		icon: "bi bi-file-earmark-plus-fill h3 mb-0",
	},
	{
		title: "Tüm Görevler",
		href: "/alltasks",
		icon: "bi bi-person-lines-fill h3 mb-0",
	},
	{
		title: "Rol İşlemleri",
		href: "/roles",
		icon: "bi bi-person-fill-lock h3 mb-0",
	},
	{
		title: "Etiket İşlemleri",
		href: "/tickets",
		icon: "bi bi-ticket-fill h3 mb-0",
	},
]

const Sidebar = () => {
	const showMobilemenu = () => {
		document.getElementById("sidebarArea").classList.toggle("showSidebar");
	};
	let location = useLocation();

	const [flag, setFlag] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	// useEffect(() => {
	// 	const token = localStorage.getItem('Token')
	// 	if (token) {
	// 		setIsLogged(true)
	// 		const decoded = jwtDecode(token);
	// 		decoded.Role === "Admin" ? setFlag(true) : setFlag(false);
	// 	}
	// }, [])

	return (
		<div className="p-3">
			<div className="d-flex align-items-center">
				<Logo />
				<span className="ms-auto d-lg-none">
					<Button
						close
						size="sm"
						className="ms-auto d-lg-none"
						onClick={() => showMobilemenu()}
					></Button>
				</span>
			</div>
			<div className="pt-4 mt-2">
				<Nav vertical className="sidebarNav">
					{isLogged ? navigation.map((navi, index) => (
						<NavItem key={index} className="sidenav-bg">
							<Link
								to={navi.href}
								className={
									location.pathname === navi.href
										? "text-primary nav-link py-3"
										: "nav-link text-secondary py-3"
								} style={{ display: 'flex', alignItems: 'center' }}
							>
								<i className={navi.icon}></i>
								<span className="ms-3 d-inline-block">{navi.title}</span>
							</Link>
						</NavItem>
					)) : null}
					<NavItem className="w-full d-flex justify-content-center"><hr className="w-75" /></NavItem>
					{
						flag ?
							adminNavigation.map((navi, index) => (
								<NavItem key={index} className="sidenav-bg">
									<Link
										to={navi.href}
										className={
											location.pathname === navi.href
												? "text-primary nav-link py-3"
												: "nav-link text-secondary py-3"
										}
										style={{ display: 'flex', alignItems: 'center' }}
									>
										<i className={navi.icon}></i>
										<span className="ms-3 d-inline-block">{navi.title}</span>
									</Link>
								</NavItem>
							))
							: null
					}
				</Nav>
			</div>
		</div>
	);
};

export default Sidebar;
