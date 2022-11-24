import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Pet.css";
import { useNavigate } from "react-router-dom";

const Pet = ({ pet }) => {
  const navigate = useNavigate();

  const { name, adoptionStatus, _id: id, imageUrl } = pet;
  return (
          <Card className="m-2" style={{width: '18rem'}} onClick={() => navigate(`/pets?petId=${id}`)}>
          <Card.Img variant="top" src={imageUrl} style={{ height: '200px'}}/>
          <Card.Body className="card-body">
            <Card.Title>{name}({adoptionStatus})</Card.Title>
            <Button className="see-more" variant="success">See More</Button>
          </Card.Body>
          </Card>
  );
};

export default Pet;
