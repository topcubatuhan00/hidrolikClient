import React, { useState, useEffect } from 'react';
import { Badge, Card, CardBody, CardTitle, Alert, Table, Button } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';

export default function AllTasks() {
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [loggedUserName, setLoggedUserName] = useState("")
    const [userId, setUserId] = useState(0)

    const fetchMission = async (id) => {
        const response = await genericApiSerice.get(`/Mission/User/?UserId=${id}&PageNumber=1&PageSize=10000`);
        if (response.status === 200) {
            setTasks(response.data.data.items);
        } else {
            setAlertText("Hata");
            setVisible(true);
        }
        setUserId(id)
    }

    const removeMission = async (id) => {
        const response = await genericApiSerice.delete("/Mission/" + id);
        if (response.status === 200) {
            setAlertText(response.data);
            setVisible(true);
        } else {
            setAlertText(response.data);
            setVisible(true);
        }

        fetchMission(userId)
    }

    // useEffect(() => {
	// 	const role = localStorage.getItem('Role')
	// 	if (role === "User") {
	// 		window.location.assign("/");
	// 	}
	// }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const users = await genericApiSerice.get("/User/GetAll?PageNumber=1&PageSize=100000");
    //         setUsers(users.data.data.items);
    //     }
    //     fetchUsers()

    //     const token = localStorage.getItem("Token")
    //     const decoded = jwtDecode(token)
    //     setLoggedUserName(decoded.UserName)
    // }, [])

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
        return convertedResult > 0 ? convertedResult + " Gün" : "0";
    }
    const [alertText, setAlertText] = useState("");
    const haandleDateChange = async (task, type) => {
        let date;
        if (calculateDays(task.estimatedEndDate) <= 0) {
            date = new Date();
        }
        else {
            date = new Date(task.estimatedEndDate)
        }
        type ? date.setDate(date.getDate() + 2) : date.setDate(date.getDate() - 0);
        let newDate = (date.toISOString().split('T')[0]);
        const obj = {
            id: task.id,
            name: task.name,
            description: task.description,
            status: task.status,
            priority: task.priority,
            estimatedEndDate: newDate,
            userId: task.userId,
            ticket: task.ticket,
            updaterName: loggedUserName,
            isActive: true

        }
        const response = await genericApiSerice.put("/Mission/Update", obj);
        if (response.status === 200) {
            setAlertText(response.data);
            setVisible(true);
        } else {
            setAlertText(response.data);
            setVisible(true);
        }
        fetchMission(userId)
    }
    const handleStatusChange = async (event, task) => {
        const obj = {
            id: task.id,
            name: task.name,
            description: task.description,
            status: event.target.value,
            priority: task.priority,
            estimatedEndDate: task.estimatedEndDate,
            userId: task.userId,
            ticket: task.ticket,
            updaterName: loggedUserName,
            isActive: true
        }
        const response = await genericApiSerice.put("/Mission/Update", obj);
        if (response.status === 200) {
            setAlertText(response.data);
            setVisible(true);
        } else {
            setAlertText(response.data);
            setVisible(true);
        }

        fetchMission(userId)
    }
    const [visible, setVisible] = useState(false);
    const onDismiss = () => {
        setVisible(false);
    };
    const navigateDetail = (id) => {
        window.location.href = `/#/task/${id}`
    }

    return (
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Bütün Görevler
            </CardTitle>

            <CardBody className='text-center'>
                <Button color="danger" className="mb-5 mt-2" outline disabled>
                    <Badge style={{ fontSize: '20px', whiteSpace: 'wrap', top: 0 }} color="danger">Görevleri Görmek İcin Kullanıcı Seciniz</Badge>
                </Button>
                {
                    users.length > 0 ?
                        <div className='userWithTaskInnner flexArea'>
                            <select defaultValue={"Kullanıcı Seçiniz"} className='form-select' name="user" onChange={e => fetchMission(e.target.value)}>
                                <option disabled>Kullanıcı Seçiniz</option>
                                {
                                    users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.userName}</option>
                                    ))
                                }
                            </select>
                        </div> : <div className='userNotFound'>Kullanıcı Yok</div>
                }

            </CardBody>
            <hr />
            <CardBody>
                <div>
                    <Alert color="info" isOpen={visible} toggle={onDismiss.bind(null)}>
                        {alertText}
                    </Alert>
                </div>
                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Görev Başlığı</th>
                            <th>Durum</th>
                            <th>Kalan Gün</th>
                            <th>Görevi Atayan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index} className="border-top" >
                                <td>
                                    <h6 className="mb-0">{index + 1}</h6>
                                </td>
                                <td style={{ cursor: 'pointer' }} onClick={() => navigateDetail(task.id)}>
                                    <h6 className="mb-0">{task.name}</h6>
                                </td>
                                <td style={{ fontSize: '16px', minWidth: '200px' }}>
                                    <select id='exampleSelect' type="select" name='select' className='form-select' onChange={(e) => handleStatusChange(e, task)} value={task.status}>
                                        <option value="ToDo">Yapılacak</option>
                                        <option value="InProgress">Yapılıyor</option>
                                        <option value="Done">Tamamlandı</option>
                                        <option value="None">Yapılmadı</option>
                                    </select>
                                </td>
                                <td>
                                    <div style={{ minWidth: '100px', maxWidth: '150px', textAlign: 'center', fontWeight: 'bold' }} className="d-flex justify-content-between text-black p-2 bg-light-success rounded d-inline-block my-2">
                                        <div><i style={{ cursor: 'pointer' }} onClick={() => haandleDateChange(task, true)} className="bi bi-plus-lg"></i></div>
                                        <span >{calculateDays(task.estimatedEndDate)}</span>
                                        <div><i style={{ cursor: 'pointer' }} onClick={() => haandleDateChange(task, false)} className="bi bi-dash-lg"></i></div>
                                    </div>
                                </td>
                                <td style={{ fontSize: '28px' }}>
                                    <div className="d-flex align-items-center p-2">
                                        <h6 className="mb-0">{task.creatorName}</h6>
                                    </div>
                                </td>
                                <td>
                                    <i onClick={() => removeMission(task.id)} style={{ fontSize: '24px', cursor: 'pointer' }} className="bi bi-trash-fill text-danger"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
