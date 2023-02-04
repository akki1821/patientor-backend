"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (Gender = {}));
var app = (0, express_1.default)();
var patients = [];
app.use(express_1.default.json());
var port = process.env.PORT || 3000;
app.get("/api/ping", function (req, res) {
    res.send("pong");
});
app.post("/api/patients", function (req, res) {
    var patient = req.body;
    var name = patient.name, gender = patient.gender;
    if (!name || !gender) {
        return res
            .status(400)
            .send({ error: "Patient name and gender are required." });
    }
    if (gender !== Gender.Male &&
        gender !== Gender.Female &&
        gender !== Gender.Other) {
        return res.status(400).send({ error: "Invalid gender value." });
    }
    var newPatient = { id: (0, uuid_1.v1)(), name: name, gender: gender };
    patients.push(newPatient);
    return res.status(201).send(newPatient);
});
app.listen(port, function () {
    console.log("Server listening at http://localhost:".concat(port));
});
