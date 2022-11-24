import React, { useState } from "react";
import {
  Dropdown,
  Form,
  Button,
  Accordion,
  DropdownButton,
} from "react-bootstrap";
import "../SearchPet/SearchPet.css";
import PetList from "../PetList/PetList";
import instance from "../../Contexts/axiosContext";

const SearchPet = () => {
  const [arrPets, setArrPets] = useState([]);
  const [searchedPet, setSearchedPet] = useState({
    type: "",
    adoptionStatus: "",
    name: "",
    height: 0,
    weight: 0,
  });

  const filterPets = async (e) => {
    try {
      e.preventDefault();
      // console.log("searchedPet before BE", searchedPet);
      const baseUrl = `/pets/searchPets/`;
      const filteredPets = await instance.get(baseUrl, {params: searchedPet}, {withCredentials: false});
      const data = await filteredPets.data;
      setArrPets(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form className="search-pet-form">
        <Form.Group>
          <h1 className="text-center mt-0 mb-3">Search For A Pet</h1>
          <Dropdown className="type-dropdown">
            <div className="d-flex justify-content-between">
              <span className="type-span">Type</span>
              <DropdownButton
                className="p-0"
                title=""
                name="type"
                variant="success"
                onSelect={(e) => setSearchedPet({ ...searchedPet, type: e })}
              >
                <Dropdown.Item eventKey="Dog">Dog</Dropdown.Item>
                <Dropdown.Item eventKey="Cat">Cat</Dropdown.Item>
              </DropdownButton>
            </div>
          </Dropdown>
          <div>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item>
                <Accordion.Header>Advanced</Accordion.Header>
                <Accordion.Body>
                  <Dropdown className="adoption-status-dropdown">
                    <div className="d-flex justify-content-between">
                      <span className="adoption-span">Adoption Status</span>
                      <DropdownButton
                        className=""
                        title=""
                        variant="success"
                        onSelect={(e) =>
                          setSearchedPet({ ...searchedPet, adoptionStatus: e })
                        }
                      >
                        <Dropdown.Item eventKey="Adopted">
                          Adopted
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Fostered">
                          Fostered
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Not Owned">
                          Not Owned
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Dropdown>
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={(e) =>
                        setSearchedPet({
                          ...searchedPet,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Form.Control
                      name="height"
                      type="number"
                      placeholder="Height"
                      onChange={(e) =>
                        setSearchedPet({
                          ...searchedPet,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Form.Control
                      name="weight"
                      type="number"
                      placeholder="Weight"
                      onChange={(e) =>
                        setSearchedPet({
                          ...searchedPet,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="search-btn-container">
            <Button
              className="search-btn"
              variant="primary"
              type="submit"
              onClick={(e) => filterPets(e)}
            >
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>

      <div className="pets-list">{<PetList arrPets={arrPets} />}</div>
    </div>
  );
};

export default SearchPet;
