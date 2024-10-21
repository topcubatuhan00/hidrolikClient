import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle
} from "reactstrap";

const Blog = (props) => {
	return (
		<Card>
			<CardImg alt="Card image cap" src={props.image} />
			<CardBody className="p-4">
				<CardTitle tag="h5">{props.title}</CardTitle>
				<CardText className="mt-3">{props.text}</CardText>
				<a href={"/#/task/"+props.id} className={`mt-5 btn btn-${props.color}`} color={props.color}>Göreve Git</a>
			</CardBody>
		</Card>

	);
};

export default Blog;
