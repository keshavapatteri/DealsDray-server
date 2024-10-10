import express from 'express'

import adminRouter from './adminRouter.js'
import employeeRouter from './employeeRouter.js'

const v1Router = express.Router();
//admin
v1Router.use('/admin',adminRouter);
//employee
v1Router.use('/employe',employeeRouter);
export default v1Router; 



