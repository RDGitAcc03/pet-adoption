import React, { useState } from "react";
import {
  Button,
} from "react-bootstrap";
import { Heading, Stack, Flex, Box } from '@chakra-ui/react';
import styles from "../SearchPet/SearchPet.module.css";
import PetList from "../PetList/PetList";
import instance from "../../Contexts/axiosContext";
import { AiOutlineClear } from 'react-icons/ai';

const SearchPet = () => {
  const [arrPets, setArrPets] = useState([]);
  const defaultSearchObj = {
    type: "",
    adoptionStatus: "",
    name: "",
    height: 0,
    weight: 0,
  };
  const [searchedPet, setSearchedPet] = useState(defaultSearchObj);

  const setProperties = (e) => {
    setSearchedPet({ ...searchedPet, [e.target.name]: e.target.value });
  }

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


  const toggleAdvancedOptions = (e) => {
    e.preventDefault();
    const advanced = document.getElementById('advanced');
    let toggle = advanced.dataset.toggle;
    // console.log("toggle: ", toggle);
    const advancedOptions = document.querySelector('#advanced-options');

    if (toggle === "false") {
      advancedOptions.style.display = 'block';
      // console.log("advancedOptions classList: ", advancedOptions.className);
      advanced.setAttribute('data-toggle', "true");
    } else {
      advancedOptions.style.display = 'none';
      // console.log("advancedOptions classList: ", advancedOptions.className);
      advanced.setAttribute('data-toggle', "false");
    }
    // console.log("advanced: ", advanced);
  }

  const clearForm = () => {
    const form = document.querySelector('form');
    setSearchedPet(defaultSearchObj);
    form.reset();
    console.log("searchedPet after clearing: ", searchedPet);
  }

  const setAdoptionStatusUI = (button) => {
    if (button.getAttribute('value') === "Owned") {
      button.classList.add('left')
    } else if (button.getAttribute('value') === "Fostered") {
      button.classList.add('middle')
    } else { button.classList.add('right') }
  }

  const setAdoptionWrapper = (e) => {
    setAdoptionStatusUI(e.target);
    setProperties(e);
  }

  console.log("searchedPet: ", searchedPet);

  return (
    <div>
      <form style={{
        background: "#f8f8f8",
        width: "400px",
        height: "500px",
        margin: "0 auto",
        position: "absolute",
        top: "18%",
        left: "50px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: '100px 50px',
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
      }}>
        <AiOutlineClear onClick={() => clearForm()}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "4%",
            right: "5%",
            fontSize: "1.4rem"
          }} />
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
            <Stack isInline w={'100%'} >
              <Box className={styles["radio-item"]}>
                <input type={'radio'}
                  id="cat"
                  name="type"
                  value="Cat"
                  color="pink"
                  onChange={(e) => setProperties(e)} />
                <label htmlFor="cat">Cat</label>
              </Box>
              <Box className={styles["radio-item"]}>
                <input type={'radio'}
                  id="dog"
                  name="type"
                  value="Dog"
                  onChange={(e) => setProperties(e)} />
                <label htmlFor="dog">Dog</label>
              </Box>
            </Stack>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between' style={{
            position: "absolute",
            top: "26%",
            left: "42%"
          }}>
            <div id="advanced" className={styles["advanced"]} data-toggle="false" onClick={(e) => toggleAdvancedOptions(e)}>Advanced</div>
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
                <button type={'button'} value='Owned' className={styles["spaced"]} name="adoptionStatus" onClick={(e) => setAdoptionWrapper(e)}>Owned</button>
                <button type={'button'} value='Fostered' className={styles["spaced"]} style={{ borderLeft: '1px solid #E2E8F0' }} name="adoptionStatus" onClick={(e) => setAdoptionWrapper(e)}>Fostered</button>
                <button type={'button'} value='Adopted' className={styles["spaced"]} style={{ borderLeft: '1px solid #E2E8F0' }} name="adoptionStatus" onClick={(e) => setAdoptionWrapper(e)}>Adopted</button>
              </Stack>
            </Stack>
            <Stack isInline >
              <label>Name:</label>
              <input
                className={styles["input-style"]}
                placeholder="Name"
                name="name"
                onChange={(e) => setProperties(e)}
              />
            </Stack>
            <Stack isInline>
              <label>Height:</label>
              <input
                className={styles["input-style"]}
                placeholder="Height"
                name="height"
                onChange={(e) => setProperties(e)}
              />
            </Stack>
            <Stack isInline>
              <label>Weight:</label>
              <input
                className={styles["input-style"]}
                placeholder="Weight"
                name="weight"
                onChange={(e) => setProperties(e)}
              />
            </Stack>
          </Stack>
          <Button className={styles["search-btn"]}
            type="submit"
            onClick={(e) => filterPets(e)}
            style={{
              position: "absolute",
              bottom: "6%",
              left: "28%",
              width: "45%"
            }}>
            Search
          </Button>
        </Stack>
      </form>

      <div className={styles["pets-list"]}>{<PetList arrPets={arrPets} />}</div>
    </div>
  );
};

export default SearchPet;