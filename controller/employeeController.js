
import { cloudinaryInstance } from '../config/cloudinaryConfig.js';
import { Employee } from '../models/employeeModel.js';

export const addEmploye = async (req, res) => {
    try {
       
        const { Name, Email, Mobile, Designation, Gender, Course } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload an image" });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "employee" });

       
        const newEmploye = new Employee({
            Name,
            Email,
            Mobile,
            Designation,
            Gender,
            Course,
            Image: uploadResult.secure_url 
        });

        await newEmploye.save();

      
        res.json({ success: true, message: "Employee created successfully", data: newEmploye });
    } catch (error) {
        
        console.log(error);
        
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

//GET all

export const getAll = async (req, res, next) => {
    try {
        const employee = await Employee.find();
        console.log(employee);
        res.json({ success: true, message: 'Employee list fetched', data: employee });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" })
    }
}



//Get By Id

export const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ success: false, message: "employee not found" });
      }
  
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  };


// update booking
export const update = async (req, res, next) => {
    try {
        let updateData = { ...req.body }; 
        console.log("Update data:", updateData);
    
        const id = req.params.id; 
        console.log("Car ID from params:", id);
    
        const updateEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    
        console.log("updated Employee:", updateEmployee);
    
        res.json({ success: true, message: "Employee updated successfully", data: updateEmployee });
      } catch (error) {
     
        console.error("Error updateEmployee:", error);
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
      }
    };
    
    
    //Employe delete
    export const deleteEmployee = async (req, res, next) => {
        try {
            let deleteData = { ...req.body }; 
            console.log("Update data:",deleteData);
        
            const id = req.params.id; 
            console.log("Car ID from params:", id);
        
            const deleteEmployee = await Employee.findByIdAndDelete(id, deleteData, { new: true });
        
            console.log("updated Employee:", deleteEmployee);
        
            res.json({ success: true, message: "Employee Deleted successfully", data: deleteEmployee});
          } catch (error) {
         
            console.error("Error updateEmployee:", error);
            res.status(error.status || 500).json({ message: error.message || "Internal server error" });
          }
        };
        