const mongoose = require('mongoose');
const customerModel = require('../model/customer')
const employeeModel = require('../model/employee')
const credModel = require('../model/credential')
const agentModel = require('../model/agent')
const stateModel = require('../model/state')
const cityModel = require('../model/city')
class DatabaseMongoose {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect("mongodb://127.0.0.1:27017/Life-Insurance")
            .then(() => {
                console.log()
            })
            .catch(err => {
                console.error(err)
            })
    }

    //insert
    async insertOneCustomer(user) {
        try {
            let newRecord = await customerModel.create(user)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    async insertOneCred(cred) {
        try {
            let newRecord = await credModel.create(cred)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    async insertOneEmployee(employee) {
        try {
            let newRecord = await employeeModel.create(employee)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    async insertOneAgent(agent) {
        try {
            let newRecord = await agentModel.create(agent)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    async insertOneState(state) {
        try {
            let newRecord = await stateModel.create(state)
            return newRecord;
        }
        catch (e) {
            return e.message;
        }
    }
    async insertOneCity(city) {
        try {
            let newRecord = await cityModel.create(city)
            return newRecord;
        }
        catch (e) {
            return e.message;
        }
    }


    //find
    async findOneCustomer(user){
        try {
            let newRecord = await customerModel.findOne(user);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async findOneCred(cred){
        try {
            let newRecord = await credModel.findOne(cred);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async findOneEmployee(employee){
        try {
            let newRecord = await employeeModel.findOne(employee);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async findOneAgent(agent){
        try {
            let newRecord = await agentModel.findOne(agent);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async findOneState(state){
        try {
            let newRecord = await stateModel.findOne(state);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async findOneCity(city){
        try {
            let newRecord = await cityModel.findOne(city);
            return newRecord;
        }
        catch (e) {
            console.log(e.message);
        }
    }


    //update
    async updateOneCustomer(user,update){
        try {
            let newRecord = await customerModel.updateOne(user,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneCred(cred,update){
        try {
            let newRecord = await credModel.updateOne(cred,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneEmployee(employee,update){
        try {
            let newRecord = await employeeModel.updateOne(employee,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneAgent(agent,update){
        try {
            let newRecord = await agentModel.updateOne(agent,update)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async updateOneState(state,update){
        try {
            let newRecord = await stateModel.updateOne(state,update)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    async updateOneCity(city,update){
        try {
            let newRecord = await cityModel.updateOne(city,update)
            return [newRecord,true];
        }
        catch (e) {
            return [e.message,false];
        }
    }
    

    //delete
    async deleteOneCred(cred){
        try {
            let newRecord = await credModel.deleteOne(cred);
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }


    //getall
    async getAllCustomers() {
        try{
            let record = await customerModel.find().populate("credential");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
    async getAllEmployees() {
        try{
            let record = await employeeModel.find().populate("credential");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
    async getAllAgent() {
        try{
            let record = await agentModel.find().populate("credential");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
    async getAllState() {
        try{
            let record = await stateModel.find().populate("city");
            return record;
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
}







module.exports = {  DatabaseMongoose }
