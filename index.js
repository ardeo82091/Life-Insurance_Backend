const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const { login } = require("./Controllers/Login/controller");
const {
  createCustomer,
  getAllCustomer,
  noOfCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./Controllers/Customer/controller.js");

const {
  createAdmin,
  createEmployee,
  getAllEmployee,
  noOfEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./Controllers/Employee/controller.js");

const {
  createAgent,
  getAllAgent,
  noOfAgent,
  updateAgent,
  deleteAgent,
} = require("./Controllers/Agent/controller.js");

const {
  createState,
  getAllState,
  updateState,
  deleteState,
} = require("./Controllers/State/controller.js");

const {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
} = require("./Controllers/City/controller.js");

const {logout} = require("./Controllers/Logout/controller.js")



app.post("/api/v1/login", async (req, resp) => login(req, resp));


//Employee
app.post("/api/v1/createEmployee", async (req, resp) =>
  createEmployee(req, resp)
);
app.post("/api/v1/getAllEmployee", async (req, resp) =>
  getAllEmployee(req, resp)
);
app.get("/api/v1/numberOfEmployee", async (req, resp) =>
  noOfEmployee(req, resp)
);
app.put("/api/v1/updateEmployee/:userName", async (req, resp) =>
  updateEmployee(req, resp)
);
app.post("/api/v1/deleteEmployee/:userName", async (req, resp) =>
  deleteEmployee(req, resp)
);

//Customer
app.post("/api/v1/createCustomer", async (req, resp) =>
  createCustomer(req, resp)
);
app.post("/api/v1/getAllCustomer", async (req, resp) =>
  getAllCustomer(req, resp)
);
app.get("/api/v1/numberOfCustomer", async (req, resp) =>
  noOfCustomer(req, resp)
);
app.put("/api/v1/updateCustomer/:userName", async (req, resp) =>
  updateCustomer(req, resp)
);
app.post("/api/v1/deleteCustomer/:userName", async (req, resp) =>
  deleteCustomer(req, resp)
);


//Agent
app.post("/api/v1/createAgent", async (req, resp) =>
  createAgent(req, resp)
);
app.post("/api/v1/getAllAgent", async (req, resp) =>
  getAllAgent(req, resp)
);
app.get("/api/v1/numberOfAgent", async (req, resp) =>
  noOfAgent(req, resp)
);
app.put("/api/v1/updateAgent/:userName", async (req, resp) =>
  updateAgent(req, resp)
);
app.post("/api/v1/deleteAgent/:userName", async (req, resp) =>
  deleteAgent(req, resp)
);

//State
app.post("/api/v1/createState", async(req,resp) =>
  createState(req, resp)  
);
app.get("/api/v1/getAllState", async(req,resp) =>
  getAllState(req, resp)  
);
app.put("/api/v1/updateState", async(req,resp) =>
  updateState(req, resp)  
);
app.post("/api/v1/deleteState", async(req,resp) =>
  deleteState(req, resp)  
);

//City
app.post("/api/v1/createCity", async(req,resp) =>
  createCity(req, resp)  
);
app.get("/api/v1/getAllCity", async(req,resp) =>
  getAllCity(req, resp)  
);
app.put("/api/v1/updateCity", async(req,resp) =>
  updateCity(req, resp)  
);
app.post("/api/v1/deleteCity", async(req,resp) =>
  deleteCity(req, resp)  
);


//logout
app.post("/api/v1/logout", (req,resp) =>logout(req,resp));



app.listen(8082, async () => {
  //await createAdmin();
  console.log("app is started at port 8082");
});
