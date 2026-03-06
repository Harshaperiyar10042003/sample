const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var admin = require("firebase-admin");
const path = require("path");
const nodemailer = require("nodemailer");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILR_USER,
    pass: process.env.NODEMAILR_PASS, // Use an App Password if 2FA is enabled
  },
});

// Database Connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// **Admin/Teacher Schema** (Renamed to prevent conflicts)
const adminTeacherSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  role: { type: String, enum: ["admin", "teacher"], required: true },
  profileimg: String,
  title: String,
  bio: String,
});
const AdminTeacher = mongoose.model("AdminTeacher", adminTeacherSchema);

// **Course Schema**
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  duration: String,
  imageUrl: String,
  level: String,
  tableOfContents: [String],
  sampleVideos: [String],
  skills: [String],
  createdBy: { type: String, required: true }, // Reference to admin/teacher
});
const Course = mongoose.model("Course", courseSchema);

const teacherRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  experience: String,
  hgstQual: String,
  techSkills: [String],
  curTeacher: Boolean,
  clgName: String,
  isITEmp: Boolean,
  comName: String,
  status: { type: String, default: "Pending" },
});
const TeacherRequest = mongoose.model("TeacherRequest", teacherRequestSchema);
const mainUserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
  role: { type: String, default: "student" },
  profileImage: String,
});
const MainUser = mongoose.model("mainUser", mainUserSchema);

// **Home Route**
app.get("/", (req, res) => {
  res.send("Welcome to CTC!");
});



// //ADMIN DASHBOARD LOGIN/REGISTERATION


// const serviceAccount = require("./serviceKey.json");
// const { title } = require("process");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


// // **Signup (Admin/Teacher)**
// app.post("/signup-teacher", async (req, res) => {
//   try {
//     let { name, email, password, phone, role } = req.body;
//     if (!["admin", "teacher"].includes(role)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid role. Choose admin or teacher." });
//     }

//     // Create Firebase User
//     const userResponse = await admin.auth().createUser({ email, password });

//     // Save user in MongoDB
//     const newUser = new AdminTeacher({
//       uid: userResponse.uid,
//       name,
//       email,
//       role,
//     });
//     await newUser.save();

//     res.json({
//       success: true,
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // **Login**
// app.post("/login", async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Authenticate with Firebase
//     const user = await admin.auth().getUserByEmail(email);
//     // console.log(user)

//     const dbUser = await AdminTeacher.findOne({ uid: user.uid });
//     // console.log(dbUser)
//     if (!dbUser) {
//       return res.status(404).json({ error: "User not found in database" });
//     }

//     // Return UID and role (Frontend should retrieve ID token)
//     res.json({ success: true, uid: user.uid, role: dbUser.role });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(400).json({ error: error.message });
//   }
// });

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token; // Accept token from header OR URL

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ error: "Invalid token" });
  }
};

// // Signup (Email/Password)
// app.post("/signup-user", async (req, res) => {
//   const { name, email, password, phone } = req.body;

//   try {
//     const userRecord = await admin.auth().createUser({ email, password });

//     const newUser = new MainUser({
//       uid: userRecord.uid,
//       name,
//       email,
//       phone,
//       role: "student",
//     });

//     await newUser.save();
//     res.json({ success: true, message: "User registered", user: newUser });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(400).json({ error: err.message });
//   }
// });

// // Login (Email Only - Firebase ID token is verified on frontend)
// app.post("/login-user", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const userRecord = await admin.auth().getUserByEmail(email);
//     const dbUser = await MainUser.findOne({ uid: userRecord.uid });

//     if (!dbUser) {
//       return res.status(404).json({ error: "User not found in DB" });
//     }

//     res.json({
//       success: true,
//       uid: dbUser.uid,
//       role: dbUser.role,
//       user: dbUser,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(400).json({ error: err.message });
//   }
// });

// // Google Login (Frontend sends Firebase ID token)
// app.post("/google-login-user", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     const { uid, email, name, picture } = decoded;

//     let user = await MainUser.findOne({ uid });

//     if (!user) {
//       user = new MainUser({
//         uid,
//         name: name || "Unnamed User",
//         email,
//         phone: decoded.phone_number || "",
//         role: "student",
//         profileImage: picture || "",
//       });
//       await user.save();
//     }

//     res.json({ success: true, user });
//   } catch (err) {
//     console.error("Google Login Error:", err);
//     res.status(403).json({ error: "Invalid token" });
//   }
// });








//FRONTEND COMMUNICATION API's


// **Fetch All Courses (For Carousel)**
app.get("/api/get-courses", async (req, res) => {
  try {
    const courses = await Course.find({}); // Fetch only required fields
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});

// **Fetch Course Details**
app.get("/api/get-course/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Error fetching course details" });
  }
});

// **Add New Course (Admin Only)**
app.post("/add-course", verifyToken, async (req, res) => {
  try {
    let {
      title,
      description,
      price,
      category,
      duration,
      imageUrl,
      tableOfContents,
      sampleVideos,
      createdBy,
    } = req.body;
    createdBy = createdBy.replace(/^"|"$/g, "");
    const user = await AdminTeacher.findOne({ uid: createdBy });
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can add courses" });
    }

    const newCourse = new Course({
      title,
      description,
      price,
      category,
      duration,
      imageUrl,
      tableOfContents,
      sampleVideos,
      createdBy,
    });
    await newCourse.save();

    res.json({
      success: true,
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Edit Course (Admin or Assigned Teacher)**
app.put("/edit-course/:id", verifyToken, async (req, res) => {
  try {
    const user = await AdminTeacher.findOne({ uid: req.user.uid });
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ error: "Course not found" });

    if (
      user.role !== "admin" &&
      course.createdBy.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this course" });
    }

    await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Course updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Delete Course (Admin or Assigned Teacher)**
app.delete("/delete-course/:id", verifyToken, async (req, res) => {
  try {
    const user = await AdminTeacher.findOne({ uid: req.user.uid });
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ error: "Course not found" });

    if (
      user.role !== "admin" &&
      course.createdBy.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this course" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Dashboard Webs
app.get("/dashboardMain", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/dblogin", async (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/db", async (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
  // res.send("Hi from dashboard");
});

const checkAdmin = (req, res, next) => {
  // console.log(req.user);  // Debugging: Check if role is present
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};

app.get("/rqPage", verifyToken, checkAdmin, async (req, res) => {
  res.sendFile(__dirname + "/public/rqPage.html");
});

app.post("/api/teacher-request", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      experience,
      hgstQual,
      techSkills,
      curTeacher,
      clgName,
      isITEmp,
      comName,
    } = req.body;

    const newRequest = new TeacherRequest({
      name,
      email,
      phone,
      experience,
      hgstQual,
      techSkills,
      curTeacher,
      clgName,
      isITEmp,
      comName,
      status: "Pending",
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/get-teacher-requests", async (req, res) => {
  try {
    const requests = await TeacherRequest.find({});
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.put("/approve-teacher/:id", async (req, res) => {
  try {
    const request = await TeacherRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "Approved";
    await request.save();

    // Send confirmation email
    await sendEmail(
      request.email,
      "Teacher Approval Confirmation",
      `Dear ${request.name},\n\nCongratulations! Your request to become a teacher has been approved by CTC.\n\nUse the below credentials to log in into your account:\n\nuserId: ${request.email}\npassword: ${request.phone}\n\nPlease visit https://z8ccm2v1-8000.inc1.devtunnels.ms/dblogin to login into your account.
          `
    );

    res.json({ message: "Teacher request approved and email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/institution-contact", async (req, res) => {
  try {
    const { iname, imail, iphone, aname, aphone } = req.body;

    await sendEmail(
      // "abhijith.saralay@gmail.com",
      "smagjinfo@gmail.com",
      "Institution Contact Request",
      `A new institution contact request has been received:\n\nInstitution Name: ${iname}\nInstitution Email: ${imail}\nInstitution Phone: ${iphone}\nAdmin Name: ${aname}\nAdmin Phone: ${aphone}`
    );

    res.json({ message: "Your Request has been sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/enroll-now", async (req, res) => {
  try {
      const { StudentName, StudentMail, StudentPhone, courseName } = req.body;
      
      await sendEmail(
          // "abhijith.saralay@gmail.com",
          "smagjinfo@gmail.com",
          "Student Enroll Request",
          `A new student enroll request has been received:\n\nStudent Name: ${StudentName}\nStudent Email: ${StudentMail}\nStudent Phone: ${StudentPhone}\nCourse Name: ${courseName}`
      );

      res.json({ message: "Enrollment successful" });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.NODEMAILR_USER,
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

app.get("/api/tutorDetails/:uid", async (req, res) => {
  try {
    const user = await AdminTeacher.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details" });
  }
});

app.get("/api/get-courses-by-category/:category", async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.category });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Course.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// **Start Server**
app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.SERVER_PORT || 5000}`);
});
