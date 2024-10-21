import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';
import SweetAlert2 from 'react-sweetalert2';
import { toast } from 'react-toastify';

export default function Roles() {
	const [users, setUsers] = useState([]);
	const [loggedUserName, setloggedUserName] = useState("")
	const [swalProps, setSwalProps] = useState({});

	const fetchUsers = async () => {
		const response = await genericApiSerice.get("/User/GetAll?PageNumber=1&PageSize=100000")
		setUsers(response.data.data.items);
	}

	// useEffect(() => {
	// 	const role = localStorage.getItem('Role')
	// 	if (role === "User") {
	// 		window.location.assign("/");
	// 	}
	// }, [])

	// useEffect(() => {
	// 	fetchUsers()
	// 	const token = localStorage.getItem("Token");
	// 	if (token) {
	// 		const usName = jwtDecode(token)
	// 		setloggedUserName(usName.UserName)
	// 	}

	// }, []);

	const handleRoleChange = async (e, user) => {
		const obj = {
			userName: user.userName,
			role: e.target.value,
			updaterName: loggedUserName
		}
		const response = await genericApiSerice.put('/User/UpdateRole', obj);
		toast.success(response.data);
		fetchUsers()

	}
	const deleteUser = async (id) => {
		const response = await genericApiSerice.delete("/User/" + id)
		toast.success(response.data);
		fetchUsers();
	}
	return (
		<Card>
			<CardTitle tag="h6" className="border-bottom p-3 mb-0">
				Roller
			</CardTitle>
			<CardBody className="">
				<Table className="no-wrap align-middle" responsive borderless>
					<thead>
						<tr>
							<th>Kullanıcı Adı</th>
							<th>Rolü</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user,
							index,
						) => (
							<tr key={index} className="border-top">
								<td>
									<div className="my-3">
										<h6 className="mb-0">{user.userName}</h6>
									</div>
								</td>
								<td>
									<div className="d-flex align-items-center my-3" style={{minWidth:'200px' }}>
										<select className='form-select' name={"role"} defaultValue={user.role} onChange={(e) => {
											setSwalProps({
												show: true,
												title: 'Rol Güncelleme',
												text: `${user.userName} Adlı Kullanıcının Yetkisini Güncellemek İstediğinize Emin misiniz?`,
												icon: 'info',
												showCancelButton: true,
												confirmButtonText: 'Güncelle',
												cancelButtonText: 'Vazgeç',
												preConfirm: () => handleRoleChange(e, user),
												didClose: () => setSwalProps({ show: false }),
											});
										}}>
											<option value={"Admin"}>Yetkili Kullanıcı</option>
											<option value={"User"}>Yetkisiz Kullanıcı</option>
										</select>
									</div>
								</td>
								<td>
									<i onClick={() => {
										setSwalProps({
											show: true,
											title: 'Kullanıcı Silme',
											text: `${user.userName} Adlı Kullanıcıyı Sistemden Silmek İstediğinize Emin misiniz?`,
											icon: 'warning',
											showCancelButton: true,
											confirmButtonText: 'Sil',
											cancelButtonText: 'Vazgeç',
											preConfirm: () => deleteUser(user.id),
											didClose: () => setSwalProps({ show: false }),
										});
									}} style={{ fontSize: '24px', cursor: 'pointer' }} className='bi bi-trash-fill text-danger'></i>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</CardBody>
			<div>
				<SweetAlert2 {...swalProps} />
			</div>
		</Card>
	)
}
