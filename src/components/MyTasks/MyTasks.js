import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";
import genericApiSerice from "./../../Services/genericHttpService";
import { jwtDecode } from "jwt-decode";

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
    var result =
      new Date(aYear, aMonth, aDay) - new Date(nowYear, nowMonth, nowDay);
    var convertedResult = Math.floor(result / (1000 * 60 * 60 * 24));
    return convertedResult > 0 ? convertedResult + " Gün" : "-";
  };

  const fetchMissions = async (pNum) => {
    const response = await genericApiSerice.get(
      `/Mission/User/?UserId=${currentUserId}&PageNumber=${pNum}&PageSize=10`
    );
    setMissions(response.data.data.items);
    setCurrentPageNumber(response.data.data.currentPage);
    setTotalPageNumber(response.data.data.totalPages);
  };

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
    window.location.href = `/#/task/${id}`;
  };

  return (
      <>
      <div class="">
    <div class="row flex-wrap">
        <div class="col-sm mx-2  p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card " style={{width:'18rem'}} >
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0" >
            <div class="card " style={{width:'18rem'}}>
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama</p>
                    <a href="#" class="btn btn-primary">Ürün Detayı</a>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2 p-0">
            <div class="card  " style={{width:'18rem'}}>
            <img className="card-img-top" src={require('../../assets/images/stock.jpg')} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ürün Adı</h5>
                    <p class="card-text">Ürün hakkında kısa açıklama </p>
                    <div >
                    <a href="#"  class="btn btn-primary">Ürün Detayı</a>
                  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


      </>
  );
}
