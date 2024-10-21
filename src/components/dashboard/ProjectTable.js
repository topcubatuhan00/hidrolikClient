import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useState, useEffect } from 'react';
import genericApiSerice from '../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';


const ProjectTables = () => {

	const [missions, setMissions] = useState([]);
	const [currentUserId, setCurrentUserId] = useState(0);

	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [totalPageNumber, setTotalPageNumber] = useState(0);

	const calculateDays = (apiDate) => {
		var nowDate = new Date();
		var aDate = new Date(apiDate);
		var nowYear = nowDate.getFullYear();
		var nowMonth = nowDate.getMonth();
		var nowDay = nowDate.getDate();
		var aYear = aDate.getFullYear();
		var aMonth = aDate.getMonth();
		var aDay = aDate.getDate();
		var result = new Date(aYear, aMonth, aDay) - new Date(nowYear, nowMonth, nowDay);
		var convertedResult = Math.floor(result / (1000 * 60 * 60 * 24));
		return convertedResult > 0 ? convertedResult + " Gün" : "-";
	}

	// const fetchMissions = async (pNum) => {
	// 	const response = await genericApiSerice.get(`/Mission/User/?UserId=${currentUserId}&PageNumber=${pNum}&PageSize=5`)
	// 	setMissions(response.data.data.items);
	// 	setCurrentPageNumber(response.data.data.currentPage)
	// 	setTotalPageNumber(response.data.data.totalPages)
	// }

	// useEffect(() => {
	// 	const token = localStorage.getItem('Token')
	// 	if (token) {
	// 		const decoded = jwtDecode(token);
	// 		setCurrentUserId(decoded.Id)
	// 		fetchMissions(1)
	// 	}

	// }, [currentUserId])
	return (
		<div>
			<Card>
				<CardBody>
					<CardTitle tag="h5">Görevleriniz</CardTitle>
					<CardSubtitle className="mb-2 text-muted" tag="h6">
						Size Atanan Görevler
					</CardSubtitle>

					<Table className="no-wrap mt-3 align-middle" responsive borderless>
						<thead>
							<tr>
								<th>Görev Başlığı</th>
								<th>Durum</th>
								<th>Kalan Gün</th>
								<th>#</th>
							</tr>
						</thead>
						<tbody>
							{missions.map((
								{
									id,
									name,
									status,
									estimatedEndDate,
								},
								index,
							) => (
								<tr key={index} className="border-top">
									<td>
										<div className="d-flex align-items-center p-2">
											<h6 className="mb-0">{name}</h6>
										</div>
									</td>
									<td style={{ fontSize: '16px' }}>
										{status.includes("ToDo") ? (
											<span style={{ minWidth: '130px', textAlign: 'center', fontWeight: 'bold' }} className="text-white p-2 bg-info rounded d-inline-block" >Yapılacak</span>
										) : status.includes("InProgress") ? (
											<span style={{ minWidth: '130px', textAlign: 'center', fontWeight: 'bold' }} className="text-white p-2 bg-warning rounded d-inline-block">Yapılıyor</span>
										) : status.includes("Done") ?
											(
												<span style={{ minWidth: '130px', textAlign: 'center', fontWeight: 'bold' }} className="text-white p-2 bg-success rounded d-inline-block">Tamamlandı</span>
											) :
											(
												<span style={{ minWidth: '130px', textAlign: 'center', fontWeight: 'bold' }} className="text-white p-2 bg-danger rounded d-inline-block">Yapılmadı</span>
											)
										}
									</td>
									<td>{calculateDays(estimatedEndDate)}</td>
									<td style={{ fontSize: '28px' }}>
										<a href={"/#/task/" + id}><i className="bi bi-eye"></i></a>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<hr />
					<nav aria-label="Page navigation example">
						<ul className="pagination">
							{Array.from({ length: totalPageNumber }, (_, index) => (
								<li className="page-item" key={index}>
									{/* <button className={index+1 === currentPageNumber ? "page-link active " : "page-link"} onClick={() => fetchMissions(index +1)}>
										{index + 1}
									</button> */}
								</li>
							))}
						</ul>
					</nav>
				</CardBody>
			</Card>
		</div>
	);
};

export default ProjectTables;
