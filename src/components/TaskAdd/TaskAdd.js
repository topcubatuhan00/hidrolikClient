import React, { useState, useEffect } from 'react';
import { Form, Card, CardBody, CardTitle, FormGroup, Input, Row, Col, Alert } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';
import "./TaskAdd.css"

export default function TaskAdd() {

    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'ToDo',
        priority: 'Düşük',
        estimatedEndDate: '',
        userId: 0,
        ticket: '',
        creatorName: ''
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [currentUserName, setCurrentUserName] = useState("");
    const [alertText, setAlertText] = useState("");
    const [visible, setVisible] = useState(false);

    // useEffect(() => {
	// 	const role = localStorage.getItem('Role')
	// 	if (role === "User") {
	// 		window.location.assign("/");
	// 	}
	// }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await genericApiSerice.get("/User/GetAll?PageNumber=1&PageSize=100000");
    //         setUsers(response.data.data.items);
    //     };
    //     const fetchTickets = async () => {
    //         const response = await genericApiSerice.get("/Ticket/GetAll?PageNumber=1&PageSize=100000");
    //         setTickets(response.data.data.items);
    //     };
    //     fetchUsers();
    //     fetchTickets();
    // }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("Token");
    //     if (token) {
    //         const decoded = jwtDecode(token);
    //         setCurrentUserName(decoded.UserName);
    //     }
    // }, []);

    // useEffect(() => {
    //     const isFormValid = formData.name.length > 0 &&
    //         formData.description.length > 0 &&
    //         formData.estimatedEndDate.length > 0;
    //     setIsButtonDisabled(!isFormValid);
    // }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            ...formData,
            status: formData.status || "ToDo",
            priority: formData.priority || "Düşük Öncelikli",
            userId: formData.userId || users[0]?.id,
            ticket: formData.ticket || tickets[0]?.name,
            creatorName: currentUserName
        };

        const response = await genericApiSerice.post('/Mission/Create', obj);
        setAlertText(response.message || "Görev başarıyla eklendi!");
        setVisible(true);
    };

    const onDismiss = () => {
        setVisible(false);
    };

    return (
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Görev Detayı
            </CardTitle>
            <CardBody className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Row id='responsiveCol'>
                        <Col id='responsiveCol'>
                            <FormGroup>
                                <span>Görev Baslığı</span>
                                <Input
                                    name="name"
                                    placeholder="Görev Başlığı"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className='mt-4'>
                                <span>Görev Önceliği</span>
                                <select id='exampleSelect' type="select" name='priority' className='form-select' onChange={handleChange} defaultValue="Düşük">
                                    <option value="Düşük">Düşük Öncelikli</option>
                                    <option value="Orta">Orta Öncelikli</option>
                                    <option value="Yüksek">Yüksek Öncelikli</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <span>Görev Açıklaması</span>
                                <Input
                                    onChange={handleChange}
                                    name="description"
                                    placeholder="Görev Açıklaması"
                                    type="textarea"
                                    style={{ height: '130px' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-4' id='responsiveCol'>
                        <Col>
                            <FormGroup>
                                <span>Görev Durumu</span>
                                <select id='exampleSelect' type="select" name='status' className='form-select' onChange={handleChange} defaultValue="ToDo">
                                    <option value="ToDo">Yapılacak</option>
                                    <option value="InProgress">Yapılıyor</option>
                                    <option value="Done">Tamamlandı</option>
                                    <option value="None">Yapılmadı</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <span>Bitiş Günü</span>
                            <Input
                                name="estimatedEndDate"
                                placeholder="Bitiş Günü"
                                type="date"
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4' id='responsiveCol'>
                        <Col>
                            <FormGroup>
                                <span>Atanacak Kullanıcı</span>
                                <select id='exampleSelect' type="select" name='userId' className='form-select' onChange={handleChange}>
                                    <option value={0} disabled>Seçiniz</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name + " " + user.lastName}</option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <span>Görev Etiketi</span>
                            <select id='exampleSelect' defaultValue="" type="select" name='ticket' className='form-select' onChange={handleChange}>
                                <option value="" disabled>Etiket Seçiniz</option>
                                {tickets.map(ticket => (
                                    <option key={ticket.id} value={ticket.name}>{ticket.name}</option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button type='submit' className="btn bg-light-success w-100 mt-4" style={{ transition: '.5s all' ,opacity: isButtonDisabled ? '.5' : '', border: 'none' }} disabled={isButtonDisabled}>
                                Görev Ekle
                            </button>
                        </Col>
                    </Row>
                </Form>
                <div className='mt-5'>
                    <Alert color="info" isOpen={visible} toggle={onDismiss}>
                        {alertText}
                    </Alert>
                </div>
            </CardBody>
        </Card>
    )
}
