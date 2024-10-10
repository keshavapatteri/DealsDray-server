
import express from "express";
import { addEmploye, deleteEmployee, getAll, getById, update} from "../../controller/employeeController.js";
import { upload } from "../../middleware/uploadMiddleware.js";


const router = express.Router()
//create employee
router.post('/create',upload.single("Image"),addEmploye);

//get all

router.get('/getall',getAll);


//getById

router.get('/getById/:id',getById)

//update
router.put('/updateEmployee/:id',update)


//Employee delete

router.delete('/delete/:id',deleteEmployee)

export default router;