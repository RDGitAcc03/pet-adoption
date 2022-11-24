import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import "./AddPet.css";
import instance from "../../../Contexts/axiosContext";
import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../../../Contexts/userContext";

const AddPet = () => {
  // const { userLoggedIn } = useUserContext();
  // const { isAdmin } = userLoggedIn;
  const [uploadedPetImage, setUploadedPetImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const inputImageRef = useRef();
  const [isHypoallergenic, setIsHypoallergenic] = useState(false);
  const [queryEdit, setQueryEdit] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getActionFromUrl();
    getCurrentPet();
    // if (queryEdit) console.log("queryEdit", queryEdit);
  }, []);

  const defualtPet = {
    type: "",
    adoptionStatus: "",
    color: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
    name: "",
    breedOfAnimal: "",
    height: 0,
    weight: 0,
    bio: "",
  };
  const [addedPet, setAddedPet] = useState(defualtPet);

  const getCurrentPet = async () => {
    const petId = await getActionFromUrl();
    const currentPet = await instance.get(`/pets/${petId}`);
    if (currentPet) console.log("current pet: ", currentPet.data?.name);
    setAddedPet(currentPet.data);
  };

  const getActionFromUrl = () => {
    const search = new URLSearchParams(window.location.search);
    const queryEdit = search.get("edit");
    if (queryEdit) setQueryEdit(queryEdit);
    return queryEdit;
  };

  const handleAddOrEditPet = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      const queryEdit = getActionFromUrl();
      formData.append("picture", uploadedPetImage);
      addedPet.petId = queryEdit;
      for (const key in addedPet) {
        formData.append(key, addedPet[key]);
      }
      if (queryEdit) {
        // console.log("queryEdit after", queryEdit);
        // console.log("isAdmin", isAdmin);
        const res = await instance.put("/pets/editPet", formData);
        const { imageUrl } = res.data;
        setImageUrl(imageUrl);
        alert("You've edited a pet !");
      } else {
        const res = await instance.post("/pets/addPet", formData);
        // console.log("res", res.data);
        const { imageUrl } = res.data;
        setImageUrl(imageUrl);
        handleClear();
        alert("You've added a pet !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = () => {
    inputImageRef.current?.click();
  };

  const handleDisplayImageDetails = (e) => {
    inputImageRef.current?.files &&
      setUploadedPetImage(inputImageRef.current.files[0]);
    setImageUrl(URL.createObjectURL(inputImageRef.current.files[0]));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsHypoallergenic(false);
    navigate(-1);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setAddedPet(defualtPet);
  };

  return (
    <>
      <h1 className="text-center p-2 mt-4 mb-3">
        {queryEdit ? "Edit Pet" : "Add Pet"}
      </h1>

      <div className="add-pet">
        <form className="form w-100">
          <Form.Group className="form-child">
            <div className="first-sec">
              <div>
                <Dropdown className="type-dropdown">
                  <div className="d-flex justify-content-between">
                    <span className="type-span">Type</span>
                    <DropdownButton
                      className=" p-0"
                      title=""
                      variant="success"
                      name="type"
                      value={addedPet?.type || ""}
                      onSelect={(e) => setAddedPet({ ...addedPet, type: e })}
                    >
                      <Dropdown.Item eventKey="Dog">Dog</Dropdown.Item>
                      <Dropdown.Item eventKey="Cat">Cat</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Dropdown>
              </div>

              <div>
                <Dropdown className="type-dropdown">
                  <div className="d-flex justify-content-between">
                    <span className="adoption-span">Adoption Status</span>
                    <DropdownButton
                      className="p-0"
                      title=""
                      variant="success"
                      name="adoptionStatus"
                      value={addedPet?.adoptionStatus || ""}
                      onSelect={(e) =>
                        setAddedPet({ ...addedPet, adoptionStatus: e })
                      }
                    >
                      <Dropdown.Item eventKey="Adopted">Adopted</Dropdown.Item>
                      <Dropdown.Item eventKey="Fostered">
                        Fostered
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Not Owned">
                        Not Owned
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Dropdown>
              </div>

              <div>
                <Dropdown className="type-dropdown">
                  <div className="d-flex justify-content-between">
                    <span className="type-span">Color</span>
                    <DropdownButton
                      className="p-0"
                      title=""
                      variant="success"
                      name="color"
                      value={addedPet?.color || ""}
                      onSelect={(e) => setAddedPet({ ...addedPet, color: e })}
                    >
                      <Dropdown.Item eventKey="Ginger">Ginger</Dropdown.Item>
                      <Dropdown.Item eventKey="Gray">Gray</Dropdown.Item>
                      <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
                      <Dropdown.Item eventKey="White">White</Dropdown.Item>
                      <Dropdown.Item eventKey="Brown">Brown</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Dropdown>
              </div>
              <div className="d-flex">
                <label htmlFor="allergic">Hypoallergenic</label>
                <input
                  type="checkbox"
                  name="hypoallergenic"
                  value={addedPet?.hypoallergenic || false}
                  checked={addedPet?.hypoallergenic}
                  onChange={(e) => {
                    setIsHypoallergenic((prev) => !prev);
                    setAddedPet({
                      ...addedPet,
                      [e.target.name]: !isHypoallergenic,
                    });
                  }}
                />
              </div>
            </div>
            <div className="second-sec">
              <textarea
                className="txt-area"
                placeholder="Dietary Restrictions"
                name="dietaryRestrictions"
                value={addedPet?.dietaryRestrictions}
                onChange={(e) =>
                  setAddedPet({
                    ...addedPet,
                    [e.target.name]: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </Form.Group>
          <div className="form-child">
            <Form.Group className="txt-inputs">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={addedPet?.name || ""}
                onChange={(e) =>
                  setAddedPet({ ...addedPet, [e.target.name]: e.target.value })
                }
              />
              <Form.Control
                type="text"
                placeholder="Breed Of Animal"
                name="breedOfAnimal"
                value={addedPet?.breedOfAnimal || ""}
                onChange={(e) =>
                  setAddedPet({ ...addedPet, [e.target.name]: e.target.value })
                }
              />
              <Form.Control
                type="text"
                placeholder="Height"
                name="height"
                value={addedPet?.height}
                onChange={(e) =>
                  setAddedPet({ ...addedPet, [e.target.name]: e.target.value })
                }
              />
              <Form.Control
                type="text"
                placeholder="Weight"
                name="weight"
                value={addedPet?.weight}
                onChange={(e) =>
                  setAddedPet({ ...addedPet, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <div>
              <textarea
                className="txt-area"
                placeholder="Bio"
                name="bio"
                value={addedPet?.bio || ""}
                onChange={(e) =>
                  setAddedPet({ ...addedPet, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-child">
            <div className="img-container">
              <img
                onError={(e) => {
                  e.target.src =
                    "http://posfacturar.com/pos_organicnails/public/upload/default_image/default_pet.jpg";
                  e.onError = null;
                }}
                alt="pet"
                src={
                  imageUrl
                    ? imageUrl
                    : addedPet.imageUrl
                    ? addedPet.imageUrl
                    : ""
                }
              />
              <label className="text-center mt-5px">Choose File:</label>
              <input
                ref={inputImageRef}
                className="d-none"
                type="file"
                onChange={(e) => handleDisplayImageDetails(e)}
                accept="image/*"
              />
              <div className="upload-container">
                <Button
                  className={`upload-img-btn btn btn-outline-${
                    uploadedPetImage ? "success" : "primary"
                  }`}
                  variant="white"
                  onClick={handleUpload}
                >
                  {uploadedPetImage ? uploadedPetImage?.name : "Upload"}
                </Button>
              </div>
            </div>
            <div className="buttons">
              {queryEdit && (
                <Button
                  className="btn"
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleClear(e)}
                >
                  Clear
                </Button>
              )}

              <Button
                className="btn"
                variant="primary"
                type="submit"
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </Button>

              <Button
                className="btn"
                variant="primary"
                onClick={(e) => handleAddOrEditPet(e)}
              >
                {queryEdit ? "Save" : "Add"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPet;
