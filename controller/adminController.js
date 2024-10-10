import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Admin } from "../models/adminModel.js";
import { Employee } from "../models/employeeModel.js";
import { generateAdminToken } from "../utilitis/generateAdminToken.js";
import bcrypt from "bcrypt"



//admin create
export const AdminCreate = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const adminExist = await Admin.findOne({ email });

    if (adminExist) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new admin
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    // Generate token
    const token = generateAdminToken(email, "admin");
    console.log(token)
    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

//admin login

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
      return res.status(404).json({ success: false, message: "Admin does not exist" });
    }

    // Compare provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, adminExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Create token (assuming you have a function `generateAdminToken`)
    const token = generateAdminToken(adminExist._id, "admin");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res.cookie('token', token, { sameSite: "None", secure: true });

    // Send response
    return res.json({ success: true, message: "Admin login successful", status: 200, token });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
//logout
export const AdminLogout = async (req, res, next) => {

  res.clearCookie("token")
  res.json({ success: true, message: 'Admin logged out successfully' })


}



//   export const addEmploye = async (req, res) => {
//     try {

//         const { Name, Email, Mobile, Designation, Gender, Course } = req.body;

//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "Please upload an image" });
//         }

//         const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "employee" });


//         const newEmploye = new Employee({
//             Name,
//             Email,
//             Mobile,
//             Designation,
//             Gender,
//             Course,
//             Image: uploadResult.secure_url 
//         });

//         await newEmploye.save();


//         res.json({ success: true, message: "Employee created successfully", data: newEmploye });
//     } catch (error) {

//         console.log(error);

//         res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//     }
// };

export const addEmploye = async (req, res) => {
  try {
    const { Name, Email, Mobile, Designation, Gender, Course } = req.body;

    // Validate required fields
    if (!Name || !Email || !Mobile || !Designation || !Gender || !Course) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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

    res.status(201).json({ success: true, message: "Employee created successfully", data: newEmploye });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
    let updateData = req.body;
    console.log("Update data:", updateData);

    const id = req.params.id;
    console.log("Car ID from params:", id);
if(req.file){
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "employee" });
    updateData.Image = uploadResult.secure_url;
  }
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
    console.log("Update data:", deleteData);

    const id = req.params.id;
    console.log("Car ID from params:", id);

    const deleteEmployee = await Employee.findByIdAndDelete(id, deleteData, { new: true });

    console.log("updated Employee:", deleteEmployee);

    res.json({ success: true, message: "Employee Deleted successfully", data: deleteEmployee });
  } catch (error) {

    console.error("Error updateEmployee:", error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

//status update
export const updateStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Toggle the employee's status
    employee.status = employee.status === 'active' ? 'deactive' : 'active';
    await employee.save();

    res.status(200).json({ message: 'Employee status updated successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update employee status', error: error.message });
  }
};
//TOTAL COUNT
export const getTotalEmployee = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments(); // Counts total employees in the collection
    console.log(totalEmployee); // Log the total employee count
    res.status(200).json({ total: totalEmployee }); // Send response with total count
  } catch (error) {
    res.status(500).json({ message: "Error fetching total Employee" });
  }
};