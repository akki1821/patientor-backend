import express from "express";
import { v1 as uuid } from "uuid";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

interface Patient {
  id: string;
  name: string;
  gender: Gender;
}

const app = express();
const patients: Patient[] = [];
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/patients", (req, res) => {
  
  
  const patient: Patient = req.body;
  const { name, gender } = patient;

  if (!name || !gender) {
    return res
      .status(400)
      .send({ error: "Patient name and gender are required." });
  }

  if (
    gender !== Gender.Male &&
    gender !== Gender.Female &&
    gender !== Gender.Other
  ) {
    return res.status(400).send({ error: "Invalid gender value." });
  }

  const newPatient = { id: uuid(), name, gender };
  patients.push(newPatient);

  return res.status(201).send(newPatient);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
