import React, { useState, useEffect } from "react";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';
import {
	Card,
	CardBody,
	CardTitle,
	ListGroup,
	CardSubtitle,
	ListGroupItem,
	Button,
} from "reactstrap";



const Feeds = () => {

	const [notifications, setNotifications] = useState([]);
	const [currentUserId, setCurrentUserId] = useState(0);

	// useEffect(() => {
	// 	const token = localStorage.getItem('Token')
	// 	if (token) {
	// 		const decoded = jwtDecode(token);
	// 		setCurrentUserId(decoded.Id)

	// 		const fetchNotify = async () => {
	// 			const response = await genericApiSerice.get("/Notification/User/" + currentUserId)
	// 			setNotifications(response.data.data);
	// 		}
	// 		fetchNotify()
	// 	}

	// }, [currentUserId])

	const calculateDifference = (date) => {
		const [datePart, timePart] = date.split(" ");
		const [day, month, year] = datePart.split(".");
		const formattedDate = `${year}-${month}-${day}`;
		const isoString = `${formattedDate}T${timePart}`;
		const targetDate = new Date(isoString);
		const now = new Date();
		const differenceInMilliseconds = now - targetDate;
		
		if (differenceInMilliseconds < 0) {
			return "Geçersiz tarih: Gelecekte bir tarih girdiniz.";
		}
	
		const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
		
		if (differenceInMinutes < 60) {
			return `${differenceInMinutes} Dakika Önce`;
		} else if (differenceInMinutes < 1440) {
			let hours = Math.floor(differenceInMinutes / 60);
			const minutes = differenceInMinutes % 60;
			if(minutes > 30){
				hours += 1;
			}
			return `${hours} Saat Önce`;
		} else {
			const days = Math.floor(differenceInMinutes / 1440);
			return `${days} Gün Önce`;
		}
	};

	return (
		<Card>
			<CardBody>
				<CardTitle tag="h5" className="d-flex justify-content-between">
					Bildirimler
					<a href="/Notifications" style={{textDecoration:'none'}} className="text-muted">Tümünü Gör</a>
				</CardTitle>
				<CardSubtitle className="text-muted" tag="h6">
					Son 6 Bildiriminiz
				</CardSubtitle>
				<ListGroup flush className="mt-2">
					{notifications?.map(({ content }, index) => (
						<ListGroupItem
							key={index}
							className="d-flex align-items-center p-3 border-0"
						>
							<Button
								className="rounded-circle me-3"
								size="sm"
								color='primary'
							>
								<i className="bi bi-bell"></i>
							</Button>
							{content.split(" | ")[0]}
							<small className="ms-auto text-muted text-small">
								{calculateDifference(content.split(" | ")[1])}
							</small>
						</ListGroupItem>
					))}
				</ListGroup>
			</CardBody>
		</Card>
	);
};

export default Feeds;
