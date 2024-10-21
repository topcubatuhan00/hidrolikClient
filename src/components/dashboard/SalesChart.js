import React, { useState, useEffect } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import { jwtDecode } from 'jwt-decode';
import genericApiSerice from './../../Services/genericHttpService';

const SalesChart = () => {
	const chartoptions = {
		options: {
			chart: {
				type: "area",
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				strokeDashArray: 3,
			},

			stroke: {
				curve: "smooth",
				width: 1,
			},
			xaxis: {
				categories: [
					"01",
					"02",
					"03",
					"04",
					"05",
					"06",
					"07",
					"08",
					"09",
					"10",
					"11",
					"12",
				],
			},
			yaxis: {
				min: 0,
				max: 3,
			}
		},
	};

	const [salesData, setSalesData] = useState({})
	const [currentUserId, setCurrentUserId] = useState(0);
	const [flag, setFlag] = useState(false);
	const [opt, setOpt] = useState({});


	// useEffect(() => {
	// 	const token = localStorage.getItem('Token')
	// 	if (token) {
	// 		const decoded = jwtDecode(token);
	// 		setCurrentUserId(decoded.Id)

	// 		const fetchData = async () => {
	// 			const response = await genericApiSerice.get("/Mission/UserChart/" + currentUserId)
	// 			setSalesData(response.data);
	// 			if (response.data.series.length) {
	// 				setFlag(true)
	// 				let max = 0;
	// 				let twoArray = response.data.series[0].data.concat(response.data.series[1].data)
	// 				twoArray.forEach(element => {
	// 					if (element > max) {
	// 						max = element;
	// 					}
	// 				});
	// 				setOpt({
	// 					options: {
	// 						chart: {
	// 							type: "area",
	// 						},
	// 						dataLabels: {
	// 							enabled: false,
	// 						},
	// 						grid: {
	// 							strokeDashArray: 3,
	// 						},

	// 						stroke: {
	// 							curve: "smooth",
	// 							width: 1,
	// 						},
	// 						xaxis: {
	// 							categories: [
	// 								"01",
	// 								"02",
	// 								"03",
	// 								"04",
	// 								"05",
	// 								"06",
	// 								"07",
	// 								"08",
	// 								"09",
	// 								"10",
	// 								"11",
	// 								"12",
	// 							],
	// 						},
	// 						yaxis: {
	// 							min: 0,
	// 							max: max + 1,
	// 							labels: {
	// 								formatter: (value) => value.toFixed(0), // Etiketlerin tam sayı olarak gösterilmesini sağlar
	// 							},
	// 						}
	// 					},
	// 				})
	// 			}
	// 		}
	// 		fetchData()
	// 	}
	// }, [currentUserId])

	return (
		<Card>
			{
				flag ?
					<CardBody>
						<CardTitle tag="h5">Görev Özeti</CardTitle>
						<CardSubtitle className="text-muted" tag="h6">
							Yıllık Görev Özeti
						</CardSubtitle>
						<Chart
							type="area"
							width="100%"
							height="390"
							options={opt.options}
							series={salesData.series}
						></Chart>
					</CardBody> : null
			}
		</Card >
	);
};

export default SalesChart;
