import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useState, useEffect } from 'react';
import genericApiSerice from './../Services/genericHttpService';
import { jwtDecode } from 'jwt-decode';

const Starter = () => {

	const [todoCount, setTodoCount] = useState(0);
	const [inProgressCount, setInProgressCount] = useState(0);
	const [doneCount, setDoneCount] = useState(0);
	const [didntdoneCount, setdidntDoneCount] = useState(0);
	const [isLogged, setIsLogged] = useState(true);
	const [comments, setComments] = useState([]);

	// useEffect(() => {
	// 	const token = localStorage.getItem('Token')
	// 	if (token) {
	// 		const decoded = jwtDecode(token);
	// 		setIsLogged(true)
	// 		const fetchMissions = async () => {
	// 			const response = await genericApiSerice.get(`/Mission/User/?UserId=${decoded.Id}&PageNumber=1&PageSize=10000`);

	// 			var dnCount = response.data.data.items.filter(x => x.status === "Done").length;
	// 			var inPCount = response.data.data.items.filter(x => x.status === "InProgress").length;
	// 			var tDoCount = response.data.data.items.filter(x => x.status === "ToDo").length;
	// 			var didntCount = response.data.data.items.filter(x => x.status === "None").length;

	// 			setTodoCount(tDoCount)
	// 			setDoneCount(dnCount)
	// 			setInProgressCount(inPCount)
	// 			setdidntDoneCount(didntCount)
	// 		}

	// 		const fetchComments = async () => {
	// 			const response = await genericApiSerice.get("/Comment/User/" + decoded.Id)
	// 			setComments(response.data);
	// 		}
	// 		fetchComments()
	// 		fetchMissions()
	// 	}
	// }, [])

	return (
		isLogged ?
			<div>
				{/***Top Cards***/}
				<Row>
					<Col sm="6" lg="3">
						<TopCards
							bg="bg-light-danger text-danger"
							title="Profit"
							subtitle="Yapılmayan"
							earning={didntdoneCount}
							icon="bi bi-backspace-reverse-fill"
						/>
					</Col>
					<Col sm="6" lg="3">
						<TopCards
							bg="bg-light-warning text-warning"
							title="Refunds"
							subtitle="Yapılacak"
							earning={todoCount}
							icon="bi bi-calendar2-week"
						/>
					</Col>
					<Col sm="6" lg="3">
						<TopCards
							bg="bg-light-success text-success"
							title="New Project"
							subtitle="Yapılıyor"
							earning={inProgressCount}
							icon="bi bi-bar-chart-steps"
						/>
					</Col>
					<Col sm="6" lg="3">
						<TopCards
							bg="bg-light-info text-into"
							title="Sales"
							subtitle="Tamamlanandı"
							earning={doneCount}
							icon="bi bi-award-fill"
						/>
					</Col>
				</Row>
				{/***Sales & Feed***/}
				<hr />
				<Row>
					<Col sm="6" lg="6" xl="7" xxl="8">
						<SalesChart />
					</Col>
					<Col sm="6" lg="6" xl="5" xxl="4">
						<Feeds />
					</Col>
				</Row>
				{/***Table ***/}
				<hr />
				<Row>
					<Col lg="12">
						<ProjectTables />
					</Col>
				</Row>
				{/***Blog Cards***/}
				<hr />
				<Row>
					<h2 className="mb-3">Son Yaptıgınız Yorumlar</h2>
					{comments.map(({ id, title, content, missionId }, index) => (
						<Col sm="6" lg="6" xl="3" key={id}>
							<Blog
								image={index === 1 ? bg1 : index === 2 ? bg2 : index === 3 ? bg3 : bg4}
								title={title}
								text={content}
								color={"success"}
								id={missionId}
							/>
						</Col>
					))}
				</Row>
			</div>
			: <div>

				<Row className="p-5 m-2" style={{borderRadius: '60px 20px 60px 20px', border:'1px solid black'}}>
					<Col sm="6" lg="6" xl="7" xxl="8">
						<img alt="img" src="https://torkapp.com/blog/bl-content/uploads/pages/2a3c560d26fdd3007348135dd3f07419/task.jpg"></img>
					</Col>
					<Col sm="6" lg="6" xl="5" xxl="4" className="homeInfo">
						<span>
							Projimo, karmaşık projelerde bile görevlerin sorunsuz bir şekilde yönetilmesini ve takip edilmesini sağlar.
							Görev oluşturma, atama, önceliklendirme, ve durum takibi gibi temel özelliklerle projelerinizi daha verimli bir şekilde yönetebilirsiniz.
							Kullanıcı dostu arayüzü sayesinde ekip üyeleri, görevlerin ilerlemesini anında takip edebilir ve görevlerdeki gecikmeleri minimuma indirebilir.
							Projelerin zamanında ve sorunsuz bir şekilde tamamlanmasını sağlayarak, verimliliği artırır ve iş süreçlerini optimize eder.
						</span>
					</Col>
				</Row>

				<Row className="p-5" style={{margin:'100px 0', borderRadius: '60px 20px 60px 20px', border:'1px solid black'}}>
					<Col sm="6" lg="6" xl="7" xxl="8" className="homeInfo">
						Projimo, ekibinizin en uygun kişilere en doğru görevleri hızlı bir şekilde atamasına olanak tanır.
						Detaylı kullanıcı profilleri, yetkinlik seviyelerine göre görev atama ve iş yükü yönetimi gibi özelliklerle, görevlerin doğru kişilere dağıtılmasını sağlar.
						Ayrıca, görevlerin önceliklendirilmesi ve zaman çizelgelerinin oluşturulması da bu süreçte büyük kolaylık sunar.
						Doğru görev dağılımı sayesinde ekip içi iş birliğini ve verimliliği artırır, proje sürelerinin daha gerçekçi bir şekilde yönetilmesine yardımcı olur.
					</Col>
					<Col sm="6" lg="6" xl="5" xxl="4">
						<img alt="img" src="https://emlakyo.net/landing/media/module/task1.jpg"></img>
					</Col>
				</Row>

				<Row className="p-5 m-2" style={{borderRadius: '60px 20px 60px 20px', border:'1px solid black'}}>
					<Col sm="6" lg="6" xl="7" xxl="8">
						<img alt="img" src="https://idenfit.com/blog/wp-content/uploads/2020/01/GO%CC%88REV@2x.png"></img>
					</Col>
					<Col sm="6" lg="6" xl="5" xxl="4" className="homeInfo">
						Projimo, ekip üyeleri arasında sürekli ve etkili bir iletişim sağlayarak iş birliğini güçlendirir.
						Görev içi yorumlar, dosya paylaşımları, anlık bildirimler ve iş birliği araçları gibi özelliklerle, ekip üyeleri görevler üzerinde kolayca iş birliği yapabilir.
						Anlık güncellemeler ve bildirimler sayesinde, proje ilerlemeleri anında tüm ekip üyelerine iletilir.
						Sürekli iletişim ve bilgi paylaşımı sayesinde, ekip üyeleri her zaman proje hedeflerine odaklanır ve iş süreçlerinde herhangi bir aksaklık yaşanmaz.
					</Col>
				</Row>
			</div>
	);
};

export default Starter;
