import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faTooth,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { faRebel } from "@fortawesome/free-brands-svg-icons";
import {
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  StepLabel,
  Stepper,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Button, FormControl, Table } from "react-bootstrap";

const AddTreatmentPlan = () => {
  const [dataTreatmentPlan, setDataTreatmentPlan] = useState({});
  const auth = useAuth();
  const [dentists, setDentists] = useState([]);
  const [treatmentCategories, setTreatmentCategories] = useState([]);
  const [treatmentCodes, setTreatmentCodes] = useState([]);
  const [selectedTreatmentCategoryId, setSelectedTreatmentCategoryId] =
    useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [teeth, setTeeth] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [selectedToTreat, setSelectedToTreat] = useState([]);
  const [selectedDentistId, setSelectedDentistId] = useState(null);
  const [selectedTreamentCodeIds, selectedTreatmentCodeIds] = useState([]);

  const apiUrl = "http://localhost:8080";
  const fetchDentists = async () => {
    const res = await axios.get(`${apiUrl}/users/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      params: {
        role: "ROLE_DENTIST",
      },
    });
    setDentists(res.data);
  };
  const fetchTreatmentCategories = async () => {
    const res = await axios.get(`${apiUrl}/treatment-categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log("Treatment categories", res.data);
    setTreatmentCategories(res.data);
  };
  useEffect(() => {
    const fetchTreatmentCodes = async () => {
      const res = await axios.get(`${apiUrl}/treatment-codes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log("Treatment code", res.data);
      setTreatmentCodes(res.data);
    };
    fetchTreatmentCodes();
  }, [selectedTreatmentCategoryId]);
  useEffect(() => {
    fetchTreatmentCategories();
    fetchDentists();
  }, []);
  const handleShowStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <FormControl className="w-25 mt-3">
              <TextField
                margin="normal"
                variant="outlined"
                type="date"
                color="secondary"
                value={dataTreatmentPlan["date"]}
                // Save selected date to dataTreatmentPlan for reusing and for back to previous step
                onChange={(e) => {
                  setDataTreatmentPlan({
                    ...dataTreatmentPlan,
                    date: e.target.value,
                  });
                }}
              />
            </FormControl>

            <div className="mt-3">
              <FormControl className="w-25">
                <InputLabel id="demo-simple-select-label">Dentist</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={dataTreatmentPlan["dentistName"]}
                  // Save selected dentist to dataTreatmentPlan for reusing and for back to previous step
                  onChange={(e) => {
                    setDataTreatmentPlan({
                      ...dataTreatmentPlan,
                      dentistName: e.target.value,
                    });
                  }}
                  id="demo-simple-select"
                  label="Dentist"
                  className="w-100"
                >
                  {dentists.map((dentist) => (
                    <>
                      <MenuItem value={dentist.id} key={dentist.id}>
                        {dentist.name}
                      </MenuItem>
                    </>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mt-2">
              <FormControl className="w-25 mt-3">
                <InputLabel id="treatment-simple-select-label">
                  Treatment list
                </InputLabel>
                <Select
                  labelId="treatment-simple-select-label"
                  value={dataTreatmentPlan["treatment"]}
                  // Save selected treatment item to dataTreatmentPlan for reusing and for back to previous step
                  onChange={(e) => {
                    setDataTreatmentPlan({
                      ...dataTreatmentPlan,
                      treatment: e.target.value,
                    });
                  }}
                  id="treatment-simple-select"
                  label="Treatment list"
                  className="w-100"
                >
                  <MenuItem value="treatment1">Treatment1</MenuItem>
                  <MenuItem value="treatment2">Treatment2</MenuItem>
                  <MenuItem value="treatment3">Treatment3</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-3">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentStep(2)}
              >
                Next
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <FormControl className="w-25 mt-3">
              <InputLabel id="tooth-simple-select-label">Tooth</InputLabel>
              <Select
                labelId="tooth-simple-select-label"
                value={dataTreatmentPlan["tooth"]}
                // Save selected tooth to dataTreatmentPlan for reusing and for back to previous step
                onChange={(e) => {
                  setDataTreatmentPlan({
                    ...dataTreatmentPlan,
                    tooth: e.target.value,
                  });
                }}
                id="tooth-simple-select"
                label="Tooth"
                className="w-100"
              >
                <MenuItem value="tooth1">Tooth1</MenuItem>
                <MenuItem value="tooth2">Tooth2</MenuItem>
                <MenuItem value="tooth3">Tooth3</MenuItem>
              </Select>
            </FormControl>

            <div className=" mt-3">
              <FormControl className="w-25">
                <InputLabel id="surface-simple-select-label">
                  Surface
                </InputLabel>
                <Select
                  labelId="surface-simple-select-label"
                  value={dataTreatmentPlan["surface"]}
                  // Save selected surface to dataTreatmentPlan for reusing and for back to previous step
                  onChange={(e) => {
                    setDataTreatmentPlan({
                      ...dataTreatmentPlan,
                      surface: e.target.value,
                    });
                  }}
                  id="surface-simple-select"
                  label="Surface"
                  className="w-100"
                >
                  <MenuItem value="surface1">Surface1</MenuItem>
                  <MenuItem value="surface2">Surface2</MenuItem>
                  <MenuItem value="surface3">Surface3</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-3">
              <Button
                variant="contained"
                color="secondary"
                className="me-3"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentStep(3)}
              >
                Next
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Card className="mt-3">
              <CardHeader>
                <p>Review information</p>
              </CardHeader>
              <CardContent>
                <div className="">
                  <p>Date: {dataTreatmentPlan.date}</p>
                </div>

                <div className="">
                  <p>Dentist: {dataTreatmentPlan["dentistName"]}</p>
                </div>

                <div className="">
                  <p>Treatment: {dataTreatmentPlan["treatment"]}</p>
                </div>

                <div className="">
                  <p>Tooth: {dataTreatmentPlan["tooth"]}</p>
                </div>

                <div className="">
                  <p>Surface: {dataTreatmentPlan["surface"]}</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-3">
              <Button
                variant="contained"
                className="me-3"
                color="secondary"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitTreatmentPlan}
              >
                Submit
              </Button>
            </div>
          </>
        );
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

  return (
    <>
      <div id="container" className="container mt-5 bg-white p-3">
        <div className="progress px-1 w-75" style={{ height: "3px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: "0%" }}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="step-container d-flex justify-content-between">
          <div className="step-circle" onClick={(e) => displayStep(1)}>
            <FontAwesomeIcon icon={faUserNurse} />
          </div>
          <div className="step-circle" onClick={(e) => displayStep(2)}>
            <FontAwesomeIcon icon={faTooth} />
          </div>
          <div className="step-circle" onClick={(e) => displayStep(3)}>
            <FontAwesomeIcon icon={faReceipt} />{" "}
          </div>
        </div>
        <form id="multi-step-form">
          <div className="step step-1">
            <h3>Select dentitst and date</h3>
            <div className="mb-3">
              <label for="date" className="form-label">
                Choose your date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              aria-label="Select dentist"
              onChange={(e) => setSelectedTreatmentCategoryId(e.target.value)}
            >
              <option selected>Open to select dentist</option>
              {dentists.map((dentist) => (
                <>
                  <option value={dentist.id} key={dentist.id}>
                    {dentist.name}
                  </option>
                </>
              ))}
            </select>

            <select className="form-select" aria-label="Select category">
              <option selected>Open treatment categories</option>
              {treatmentCategories.map((category) => (
                <>
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                </>
              ))}
            </select>
            <p>Choose treatment</p>
            <div className="form-check">
              {treatmentCodes.map((code) => (
                <>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`treatment${code.id}`}
                  />
                  <label
                    className="form-check-label"
                    for={`treatment${code.id}`}
                  >
                    {code.description}
                  </label>
                </>
              ))}
            </div>

            <button type="button" className="btn btn-primary next-step">
              Next
            </button>
          </div>
          <div className="step step-2">
            <h3>Step 2</h3>
            <div className="mb-3">
              <label for="field2" className="form-label">
                Field 2:
              </label>
              <input
                type="text"
                className="form-control"
                id="field2"
                name="field2"
              />
            </div>
            <button type="button" className="btn btn-primary prev-step">
              Previous
            </button>
            <button type="button" className="btn btn-primary next-step">
              Next
            </button>
          </div>

          <div className="step step-3 row justify-content-center">
            <div classNameName="col-8">
              <h3>Step 3</h3>
              <div className="mb-3">
                <label for="field3" className="form-label">
                  Field 3:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="field3"
                  name="field3"
                />
              </div>
              <button type="button" className="btn btn-primary prev-step">
                Previous
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <h3 className="text-center mt-5 mb-4">Treatment plan</h3>
      <Stepper
        style={{ width: "100%" }}
        activeStep={currentStep - 1}
        orientation="horizontal"
      >
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
      <div className="text-center">{handleShowStep(currentStep)}</div>

      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Dentist</StyledTableCell>
              <StyledTableCell align="right">Treatment</StyledTableCell>
              <StyledTableCell align="right">Tooth</StyledTableCell>
              <StyledTableCell align="right">Surface</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalData.map((data, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {data.date}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {data.dentistName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.treatment}
                </StyledTableCell>
                <StyledTableCell align="right">{data.tooth}</StyledTableCell>
                <StyledTableCell align="right">{data.surface}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AddTreatmentPlan;
