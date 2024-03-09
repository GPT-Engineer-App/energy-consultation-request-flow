import React, { useState } from "react";
import { Box, Button, Checkbox, CheckboxGroup, Container, FormControl, FormLabel, Heading, Input, Stack, Textarea, VStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [floors, setFloors] = useState("");
  const [size, setSize] = useState("");
  const [challenges, setChallenges] = useState("");
  const [commonProblems, setCommonProblems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();

  const commonBuildingProblems = ["Poor insulation", "Inefficient HVAC systems", "Old windows", "Inadequate lighting systems", "Outdated appliances"];

  const nextStep = () => {
    if (step === 4) {
      // Validate name and email
      if (!name.trim() || !email.trim()) {
        toast({
          title: "Error",
          description: "Please enter your name and email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      // Here we could submit the data, but for this prototype we'll just show a success message
      toast({
        title: "Request submitted",
        description: "Our consultant team will contact you shortly.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleCommonProblemsChange = (values) => {
    setCommonProblems(values);
  };

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Search for address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
        );
      case 2:
        return (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Number of floors</FormLabel>
              <Input type="number" placeholder="Enter number of floors" value={floors} onChange={(e) => setFloors(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Size of the building (sqm)</FormLabel>
              <Input type="number" placeholder="Enter size in square meters" value={size} onChange={(e) => setSize(e.target.value)} />
            </FormControl>
          </VStack>
        );
      case 3:
        return (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Describe your energy challenges</FormLabel>
              <Textarea placeholder="Describe here" value={challenges} onChange={(e) => setChallenges(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Common problems with old buildings</FormLabel>
              <CheckboxGroup colorScheme="green" defaultValue={commonProblems} onChange={handleCommonProblemsChange}>
                <Stack spacing={[1, 5]} direction={["column", "column"]}>
                  {commonBuildingProblems.map((problem, index) => (
                    <Checkbox key={index} value={problem}>
                      {problem}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </VStack>
        );
      case 4:
        return (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Your name</FormLabel>
              <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Your email</FormLabel>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </VStack>
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <Container py={8}>
      <VStack spacing={8}>
        <Heading>Energy Consultation Request</Heading>
        {renderStepContent(step)}
        <Stack direction="row" spacing={4} justify="center">
          {step > 1 && (
            <Button onClick={previousStep} colorScheme="teal">
              Previous
            </Button>
          )}
          <Button rightIcon={step === 4 ? undefined : "→"} colorScheme="teal" onClick={nextStep}>
            {step === 4 ? "Submit" : "Next"}
          </Button>
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
