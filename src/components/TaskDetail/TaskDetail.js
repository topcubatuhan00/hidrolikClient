import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, CardTitle, Alert, Form, FormGroup, Button, Input } from "reactstrap";
import genericApiSerice from './../../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import "./TaskDetail.css";

export default function TaskDetail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [loggedUserName, setLoggedUserName] = useState("");
    const [loggedUserId, setLoggedUserId] = useState(0)
    const [statusOption, setStatusOption] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        userId: 0,
        missionId: 0,
        filePathName: '',
        creatorName: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            title: formData.title,
            content: formData.content,
            userId: loggedUserId,
            missionId: id,
            filePathName: "",
            creatorName: loggedUserName
        }
        const response = await genericApiSerice.post('/Comment/Create', obj)
        toast.success(response)
        document.getElementById("commentTitle").value = "";
        document.getElementById("commentContent").value = "";
        fetchComments();
    };

    const fetchComments = async () => {
        const response = await genericApiSerice.get("/Comment/GetComments?MissionId=" + id)
        setComments(response.data);
    }

    // useEffect(() => {
    //     const fetchMission = async () => {
    //         var response = await genericApiSerice.get("/Mission/" + id);
    //         setData(response.data.data);
    //         setStatusOption(response.data.data.status)
    //     }

    //     let token = localStorage.getItem("Token");
    //     if (token) {
    //         let decoded = jwtDecode(token);
    //         setLoggedUserName(decoded.UserName);
    //         setLoggedUserId(decoded.Id)
    //     }

    //     fetchComments()
    //     fetchMission();
    // }, [id])

    const calculateDays = (apiDate) => {
        var nowDate = new Date();
        var aDate = new Date(apiDate);

        // Tarihlerin gün, ay ve yıl bilgilerini al
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth();
        var nowDay = nowDate.getDate();

        var aYear = aDate.getFullYear();
        var aMonth = aDate.getMonth();
        var aDay = aDate.getDate();

        // Tarih farkını hesapla
        var result = new Date(aYear, aMonth, aDay) - new Date(nowYear, nowMonth, nowDay);
        var convertedResult = Math.floor(result / (1000 * 60 * 60 * 24));

        return convertedResult > 0 ? convertedResult + " Gün" : "Görevin Tarihi Dolmuş";
    }

    const removeComment = async (id) => {
        const response = await genericApiSerice.delete("/Comment/" + id);
        if (response.status === 200) {
            toast.success(response.data)
            fetchComments();
        } else {
            toast.error(response.data)
        }
        fetchComments();
    }
    const handleStatusChange = async (event) => {
        setStatusOption(event.target.value);
        const obj = {
            id: data.id,
            name: data.name,
            description: data.description,
            status: event.target.value,
            priority: data.priority,
            estimatedEndDate: data.estimatedEndDate,
            userId: data.userId,
            ticket: data.ticket,
            updaterName: loggedUserName,
            isActive: true
        }
        const response = await genericApiSerice.put("/Mission/Update", obj);
        if (response.status === 200) {
            toast.success(response.data)
        } else {
            toast.error(response.data)
        }
    };

    return (
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Görev Detayı
            </CardTitle>
            <CardBody className="">
                <Container>
                    <Row className="mt-3">
                        <Col style={{ fontSize: '18px' }}>
                            <div className="card card-body bg-light-success">
                                <div id='taskDescDetail' className='d-flex justify-content-between'>
                                    <span id='taskDescTitle'>Görev Başlığı : </span>
                                    <span>{data.name}</span>
                                </div>
                                <hr />
                                <div id='taskDescDetail' className='d-flex justify-content-between'>
                                    <span id='taskDescTitle'>Görev Açıklaması : </span>
                                    <span id='taskDesc' style={{maxWidth:'250px'}}>{data.description}</span>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <span><i className="bi bi-ticket-fill" style={{ marginRight: '10px' }}></i> {data.ticket}</span>
                                    <span><i className="bi bi-fire" style={{ marginRight: '10px' }}></i>{data.priority}</span>
                                </div>
                                <hr />
                                <div id='taskDescDetail' className='d-flex justify-content-between'>
                                    <span id='taskDescIcon'><i className="bi bi-calendar-check-fill" style={{ marginRight: '10px' }}></i>{calculateDays(data.estimatedEndDate)}</span>
                                    <span id='taskDescIcon'><i className="bi bi-person-add" style={{ marginRight: '10px' }}></i>{data.creatorName}</span>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <span>Görev Durumu</span>
                                    <span>
                                        <select id='exampleSelect' type="select" name='select' className='form-select' onChange={handleStatusChange} value={statusOption}>
                                            <option value="ToDo">Yapılacak</option>
                                            <option value="InProgress">Yapılıyor</option>
                                            <option value="Done">Tamamlandı</option>
                                            <option value="None">Yapılmadı</option>
                                        </select>

                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <div className="card card-body bg-light-success">
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            name="title"
                                            placeholder="Yorum Basligi"
                                            type="text"
                                            onChange={handleChange}
                                            id='commentTitle'
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            name="content"
                                            placeholder="Yorum Icerigi"
                                            type="text"
                                            onChange={handleChange}
                                            id='commentContent'
                                        />
                                    </FormGroup>
                                    <Button type='submit' className="mt-2 w-100">Yorum Yap</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ maxHeight: '400px', overflowY: 'auto' }} className='mt-3'>
                        <Col>
                            <h3 className='mb-2 text-center'>Yorumlar</h3>
                            <div className="card card-body bg-light-success text-black" style={{ fontWeight: 'bold' }}>
                                {
                                    comments.map((comment) => (
                                        <div key={comment.id} className='card card-body'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span style={{ borderBottom: '1px solid black' }}>Başlık : </span>
                                                    <span style={{ borderBottom: '1px solid black' }}>
                                                        {comment.title}
                                                    </span>
                                                </div>
                                                <div>
                                                    <i onClick={() => removeComment(comment.id)} className='bi bi-trash3-fill' style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}></i>
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <span>İçerik : </span>
                                                <span>{comment.content}</span>
                                            </div>
                                            <hr />
                                            <div id='taskDescDetail' className='d-flex justify-content-between align-items-center'>
                                                <div id='taskDescIcon'>
                                                    <i className="bi bi-person-add" style={{ marginRight: '10px' }}></i>
                                                    <span>{comment.creatorName}</span>
                                                </div>
                                                <div id='taskDescIcon'>
                                                    <i className="bi bi-calendar-check-fill" style={{ marginRight: '10px' }}></i>
                                                    {
                                                        comment.createdDate.split("T")[0] + " " +
                                                        comment.createdDate.split("T")[1].split(":")[0] + ":" + comment.createdDate.split("T")[1].split(":")[1]
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

