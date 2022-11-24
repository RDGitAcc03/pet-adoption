import React from "react";
import "./OwnedPet.css";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OwnedPet = ({ ownedPet }) => {
  const navigate = useNavigate();
  const { name, adoptionStatus, imageUrl, _id: id } = ownedPet;

  return (
    <div>
      <Card
        className="m-2"
        style={{ width: "18rem" }}
        onClick={() => navigate(`pets?petId=${id}`)}
      >
        <Card.Img variant="top" src={imageUrl} style={{ height: "200px" }} />
        <Card.Body className="card-body">
          <Card.Title>
            {name}({adoptionStatus})
          </Card.Title>
          <Button className="see-more" variant="success">
            See More
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OwnedPet;
