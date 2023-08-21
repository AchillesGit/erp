import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { UserData } from "../../models/UserData";
import { TriangleData } from "../../models/TriangleData";

const steps = ["Benutzereingaben", "Magisches Dreieck", "Informationen", "PDF"];

const CalcStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState<UserData>(new UserData(0, "", ""));
  const [triangleData, setTriangleData] = useState<TriangleData>(
    new TriangleData(50, 50, 50)
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeStepOne = (userData: UserData) => {
    setUserData(userData);
  };
  const handleChangeStepTwo = (triangleData: TriangleData) => {
    setTriangleData(triangleData);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo onChange={handleChangeStepTwo} />;
      case 2:
        return <StepThree userData={userData} triangleData={triangleData} />;
      case 3:
        return <StepFour />;
      default:
        return <Typography>Unbekannter Schritt</Typography>;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>{getStepContent(activeStep)}</div>
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Zurück
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalcStepper;
