import React, { useState } from "react";
import {
  Button,
} from "react-bootstrap";
import { Heading, Input, Stack, Radio, Select, Flex } from '@chakra-ui/react';
import styles from "../SearchPet/SearchPet.module.css";
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
      const filteredPets = await instance.get(baseUrl, { params: searchedPet }, { withCredentials: false });
      const data = await filteredPets.data;
      setArrPets(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const selection = document.querySelector('select');
  // selection && selection.addEventListener('select', () => {
  //   selection.style.outline = 'none';
  // })

  const toggleAdvancedOptions = () => {
    const advanced = document.getElementById('advanced');
    let toggle = advanced.dataset.toggle;
    console.log("toggle: ", toggle);
    const advancedOptions = document.querySelector('#advanced-options');

    if (toggle === "false") {
      // advancedOptions.classList.remove(...advancedOptions.classList);
      // advancedOptions.classList.add('displayOptions');
      advancedOptions.style.display = 'block';
      console.log("advancedOptions classList: ", advancedOptions.className);
      advanced.setAttribute('data-toggle', "true");
    } else {
      // advancedOptions.classList.remove(...advancedOptions.classList);
      advancedOptions.style.display = 'none';
      console.log("advancedOptions classList: ", advancedOptions.className);
      advanced.setAttribute('data-toggle', "false");
    }
    console.log("advanced: ", advanced);
  }

  const setChoiceOfAdoption = (button) => {
    if (button.getAttribute('value') === "Owned") {
      button.classList.add('left')
    } else if (button.getAttribute('value') === "Fostered") {
      button.classList.add('middle')
    } else { button.classList.add('right') }
  }

  return (
    <label>
      {/* <FormControl nameName="search-pet-form">
        <Form.Group>
          <Heading as='h1'>Search For A Pet</Heading>
          <Dropdown nameName="type-dropdown">
            <label nameName="d-flex justify-content-between">
              <button nameName="type-button">Type</button>
              <DropdownButton
                nameName="p-0"
                title=""
                name="type"
                variant="success"
                onSelect={(e) => setSearchedPet({ ...searchedPet, type: e })}
              >
                <Dropdown.Item eventKey="Dog">Dog</Dropdown.Item>
                <Dropdown.Item eventKey="Cat">Cat</Dropdown.Item>
              </DropdownButton>
            </label> 
          </Dropdown>
          <label>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item>
                <Accordion.Header>Advanced</Accordion.Header>
                <Accordion.Body>
                  <Dropdown nameName="adoption-status-dropdown">
                    <label nameName="d-flex justify-content-between">
                      <button nameName="adoption-button">Adoption Status</button>
                      <DropdownButton
                        nameName=""
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
                    </label> 
                  </Dropdown>
                  <label>
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
                  </label> 
                  <label>
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
                  </label> 
                  <label>
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
                  </label> 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </label> 

          <label nameName="search-btn-container">
            <Button
              nameName="search-btn"
              type="submit"
              onClick={(e) => filterPets(e)}
            >
              Search
            </Button>
          </label> 
        </Form.Group>
      </FormControl> */}

      <form style={{
        background: "#f8f8f8",
        width: "400px",
        height: "500px",
        margin: "0 auto",
        position: "absolute",
        top: "100px",
        left: "50px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: '100px 50px',
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
      }}>
        <Stack>
          <Heading as="h1" size="lg" style={{
            position: "absolute",
            top: "9%",
            left: "38.9%"
          }}>Header</Heading>
          <Flex justifyContent='space-between' style={{
            position: "absolute",
            top: "19%",
            left: "10%",
            width: "53%"
          }}>
            <label>Type:</label>
            <Radio
              isChecked={true}
              value="cat"
              aria-label="cat"
              name="animal-type"
            >
              Cat
            </Radio>
            <Radio
              value="dog"
              aria-label="dog"
              name="animal-type"
            >
              Dog
            </Radio>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between' style={{
            position: "absolute",
            top: "26%",
            left: "42%"
          }}>
            <div id="advanced" style={{ display: 'inline', margin: '10px auto' }} data-toggle="false" onClick={() => toggleAdvancedOptions()}>Advanced</div>
          </Flex>
          <Stack id="advanced-options" display={"none"} className={styles["advanced-options"]} style={{
            position: "absolute",
            top: "37%",
            left: "10%",
            width: "80%"
          }}>
            <Stack isInline w={'fit-content'} >
              <label>Adoption Status</label>
              <Stack id='adoptionSelection' isInline border={'1px solid #E2E8F0'} borderRadius={'6px'}>
                <button type={'button'} value='Owned' className={styles["spaced"]} onClick={(e) => setChoiceOfAdoption(e.target)} >Owned</button>
                <button type={'button'} value='Fostered' className={styles["spaced"]} style={{ borderLeft: '1px solid #E2E8F0' }} onClick={(e) => setChoiceOfAdoption(e.target)}>Fostered</button>
                <button type={'button'} value='Adopted' className={styles["spaced"]} style={{ borderLeft: '1px solid #E2E8F0' }} onClick={(e) => setChoiceOfAdoption(e.target)}>Adopted</button>
              </Stack>
              {/* <select nameName={styles["selection"]} placeholder='Adoption Status'>
              <option value='Owned'>Owned</option>
              <option value='Fostered'>Fostered</option>
              <option value='Adopted'>Adopted</option>
            </select> */}
            </Stack>
            <Stack isInline >
              <label>Name:</label>
              <input
                className={styles["input-style"]}
                placeholder="Name"
                aria-label="Name"
              />
            </Stack>
            <Stack isInline>
              <label>Height:</label>
              <input
                className={styles["input-style"]}
                placeholder="Height"
                aria-label="Height"
              />
            </Stack>
            <Stack isInline>
              <label>Weight:</label>
              <input
                className={styles["input-style"]}
                placeholder="Weight"
                aria-label="Weight"
              />
            </Stack>
          </Stack>
          <Button className={styles["search-btn"]} type="submit" style={{
            position: "absolute",
            bottom: "6%",
            left: "28%",
            width: "45%"
          }}>
            Search
          </Button>
        </Stack>
      </form>




      <label className="pets-list">{<PetList arrPets={arrPets} />}</label>
    </label>
  );
};

export default SearchPet;