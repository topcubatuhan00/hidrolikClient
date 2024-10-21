import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';

export default function MyTasks() {

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

    const fetchMissions = async (pNum) => {
        const response = await genericApiSerice.get(`/Mission/User/?UserId=${currentUserId}&PageNumber=${pNum}&PageSize=10`)
        setMissions(response.data.data.items);
        setCurrentPageNumber(response.data.data.currentPage)
        setTotalPageNumber(response.data.data.totalPages)
    }

    // useEffect(() => {
	// 	const role = localStorage.getItem('Role')
	// 	if (role === null) {
	// 		window.location.assign("/");
	// 	}
	// }, [])

    // useEffect(() => {
    //     const token = localStorage.getItem('Token')
    //     if (token) {
    //         const decoded = jwtDecode(token);
    //         setCurrentUserId(decoded.Id)
    //         fetchMissions(1)
    //     }

    // }, [currentUserId])

    const navigateDetail = (id) => {
        window.location.href = `/#/task/${id}`
    }


    return (
        <Card>
            <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                Görevleriniz
            </CardTitle>
            <CardBody className="">
                <Row>
                    <Col>
                        <Table className="no-wrap align-middle" responsive borderless style={{ overflowX: 'scroll' }}>
                            <thead>
                                <tr>
                                    <th>Görev Başlığı</th>
                                    <th>Görev Açıklaması</th>
                                    <th>Durum</th>
                                    <th>Önceliği</th>
                                    <th>Kalan Gün</th>
                                    <th>Etiket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {missions.map((
                                    {
                                        id,
                                        name,
                                        description,
                                        status,
                                        priority,
                                        estimatedEndDate,
                                        ticket,
                                        creatorName
                                    },
                                    index,
                                ) => (
                                    <tr style={{ cursor: 'pointer' }} onClick={() => navigateDetail(id)} key={index} className="border-top">
                                        <td>
                                            <div className="my-3">
                                                <h6 className="mb-0">{name}</h6>
                                                <span className='text-muted'><i className="bi bi-person-add" style={{ fontSize: '20px', marginRight: '10px' }}></i>{creatorName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center my-3">
                                                <h6 className="mb-0">
                                                    {description.length > 25 ? `${description.substring(0, 25)}...` : description}
                                                </h6>
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
                                        <td>
                                            <div className="d-flex align-items-center my-3">
                                                <span style={{ minWidth: '100px', textAlign: 'center', fontWeight: 'bold' }} className="text-black p-2 bg-light-danger rounded d-inline-block" >
                                                    {priority.includes("Yüksek")
                                                        ?
                                                        <i className="bi bi-fire" style={{ fontSize: '20px', marginRight: '5px' }}></i>
                                                        : priority.includes("Düşük")
                                                            ?
                                                            <i className="bi bi-snow" style={{ fontSize: '20px', marginRight: '5px' }}></i>
                                                            : <i className="bi bi-cloud-moon-fill" style={{ fontSize: '20px', marginRight: '5px' }}></i>
                                                    }
                                                    {priority}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ minWidth: '100px', textAlign: 'center', fontWeight: 'bold' }} className="text-black p-2 bg-light-success rounded d-inline-block" >{calculateDays(estimatedEndDate)}</span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center my-3">
                                                <span style={{ minWidth: '100px', textAlign: 'center', fontWeight: 'bold' }} className="text-black p-2 bg-light-warning rounded d-inline-block" >{ticket}</span>
                                            </div>
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
                                        <button style={{ zIndex: 0 }} className={index + 1 === currentPageNumber ? "page-link active " : "page-link"} onClick={() => fetchMissions(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
