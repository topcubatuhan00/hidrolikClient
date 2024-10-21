import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table, Form, FormGroup,Badge } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import SweetAlert2 from 'react-sweetalert2';
import { toast } from 'react-toastify';


export default function Tickets() {
	const [tickets, setTickets] = useState([]);
	const [swalProps, setSwalProps] = useState({});

	// useEffect(() => {
	// 	const role = localStorage.getItem('Role')
	// 	if (role === "User") {
	// 		window.location.assign("/");
	// 	}
	// }, [])

	const fetchTickets = async () => {
		const response = await genericApiSerice.get(`/Ticket/GetAll?PageNumber=1&PageSize=1000`)
		setTickets(response.data.data.items);
	}
	// useEffect(() => {
	// 	fetchTickets()
	// }, []);

	const deleteTicket = async (id) => {
		const response = await genericApiSerice.delete("/Ticket/" + id)
		if (response.status === 200) {
			toast.success(response.data);
		}
		fetchTickets();
	}
	const updateTicket = async (ticket) => {
		const obj = {
			id: ticket.id,
			name: ticket.name,
		}
		const response = await genericApiSerice.put('/Ticket/Update', obj);
		toast.success(response.data);
		fetchTickets()
	}

	const addTicket = async () => {
		let name = document.getElementById("ticketName").value;
		const obj = {
			name: name,
		}
		const response = await genericApiSerice.post('/Ticket/Create', obj);
		toast.success(response);
		fetchTickets();
	}

	return (
		<>
			<Card>
				<CardTitle tag="h6" className="border-bottom p-3 mb-0">
					Etiketler
				</CardTitle>
				<CardBody className="">
					<Table style={{ maxHeight: '450px', overflowY: 'auto' }} className="no-wrap align-middle" responsive borderless>
						<thead>
							<tr>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{tickets.map((ticket,
								index,
							) => (
								<tr key={index} className="border-top">
									<td>
										<Badge color="secondary" className="ms-3" style={{width:'150px',fontSize:'20px',top:0, whiteSpace:'wrap',}}>
											{ticket.name}
										</Badge>
									</td>
									<td>
										<i onClick={() => deleteTicket(ticket.id)} style={{ fontSize: '24px', cursor: 'pointer' }} className='bi bi-trash-fill text-danger'></i>
									</td>
									<td>
										<i onClick={() => {
											setSwalProps({
												show: true,
												title: `${ticket.name} Etiketinin Yeni Değerini Giriniz...`,
												input: "text",
												icon: 'info',
												showCancelButton: true,
												confirmButtonText: 'Güncelle',
												cancelButtonText: 'Vazgeç',
												preConfirm: (name) => updateTicket({ id: ticket.id, name: name }),
												didClose: () => { setSwalProps({ show: false }); fetchTickets() },
											});
										}} style={{ fontSize: '24px', cursor: 'pointer' }} className='bi bi-pencil text-warning'></i>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</CardBody>
			</Card>
			<Card>
				<CardTitle tag="h6" className="border-bottom p-3 mb-0">
					Etiket Ekle
				</CardTitle>
				<CardBody>
					<Form onSubmit={() => addTicket()}>
						<FormGroup className='d-flex justify-content-center w-100'>
							<input type="text" id='ticketName' placeholder="Etiket Adı" className='w-75' />
						</FormGroup>
						<FormGroup className='d-flex justify-content-center w-100'>
							<button type="submit" className='btn btn-outline-warning w-75'>Ekle</button>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
			<div>
				<SweetAlert2 {...swalProps} />
			</div>
		</>
	)
}
