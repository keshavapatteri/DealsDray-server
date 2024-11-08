import express from "express";
import { addEmploye,AdminCreate,adminLogin, AdminLogout, checkUser, deleteEmployee, getAll, getById, getTotalEmployee, update, updateStatus } from "../../controller/adminController.js";

import { upload } from "../../middleware/uploadMiddleware.js";
import { authAdmin } from "../../middleware/authAdmin.js";




const router = express.Router()
//create admin
router.post('/create',AdminCreate);

// admin login
router.post('/login',adminLogin);

//admin logout
router.post('/logout',authAdmin,AdminLogout);


router.post('/createemployee',upload.single("Image"),addEmploye);

//get all

router.get('/getall',getAll);


//getById

router.get('/getById/:id',getById)

//update
router.put('/updateEmployee/:id',upload.single("Image"),update)


// Employee delete

router.delete('/delete/:id',deleteEmployee)

router.patch('/updateStatus/:id',updateStatus)

// get total count

router.get('/totalcount',getTotalEmployee);

router.get("/check-user",authAdmin,checkUser);

export default router;