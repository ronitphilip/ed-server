const express = require('express')
const {jwtMiddleware, verifyAdmin} = require('../middleWare/jwtMiddleWare')
const upload = require('../middleWare/uploadMiddleware')
const userController = require('../controllers/userController')
const imgController = require('../controllers/imgController')
const collegeController = require('../controllers/collegeController')
const courseController = require('../controllers/courseController')
const commentController = require('../controllers/commentController')
const testiController = require('../controllers/testiController')
const adminController = require('../controllers/adminController')
const viewController = require('../controllers/viewController')
const alertController = require('../controllers/alertController')
const enquiryController = require('../controllers/enquiryController')

const router = express.Router()

// register a new user
router.post('/register', userController.registerController)

// login a user
router.post('/login', userController.loginController)

// get all users
router.get('/all-users', verifyAdmin, userController.getAllUsersController)

// add new image
router.post('/add-image', verifyAdmin, imgController.addImagesController)

// get all images
router.get('/images' , imgController.allImagesController)

// add new college
router.post('/add-college', verifyAdmin, upload.array("images", 5), collegeController.addCollege)

// get all colleges
router.get('/colleges', collegeController.getAllColleges)

// get a colleges
router.get('/:id/colleges', collegeController.getACollege)

// add visit
router.post('/:id/add-visit', collegeController.addCollegeVisit)

// get a course
router.get('/:id/get-course', courseController.getACourse)

// get all courses
router.get('/courses', courseController.getAllCourses)

// add new comment
router.post('/add-comment', jwtMiddleware, commentController.addComment)

// get college comments
router.get('/:id/get-comment', commentController.getCollegeComments)

// report comment
router.post('/report-comment', jwtMiddleware, commentController.reportCommentController)

// get reported comments
router.get('/flagged-comments', verifyAdmin, commentController.getFlaggedCommentsController)

// save college
router.post('/save-college', jwtMiddleware, userController.saveCollege)

// get saved colleges
router.get('/get-saved', jwtMiddleware, userController.getAllSavedColleges)

// remove saved college
router.delete('/:collegeId/remove-saved', jwtMiddleware, userController.removeSavedCollege);

// add testimonial
router.post('/add-testimonial', jwtMiddleware, testiController.addTestimonial)

// delete testimonial
router.delete('/delete-testimonial', jwtMiddleware, testiController.deleteTestimonial);

// update status of testimonial
router.put('/testimonial/:id/status', verifyAdmin, testiController.setStatusOfTestimonial);

// all testimonials
router.get('/all-testimonials', verifyAdmin, testiController.getAllTestimonials);

// admin login
router.post('/admin-login', adminController.adminLogin);

// add views
router.post('/add-views', viewController.addViewController);

// get view count
router.get('/view-count', verifyAdmin, viewController.getViewController);

// create new alert
router.post('/create-alert', verifyAdmin, alertController.createAlertController);

// update alert status
router.put('/alert/:id/edit', verifyAdmin, alertController.editAlertController);

// get all alers
router.get('/all-alerts', jwtMiddleware, alertController.getAllAlertsController);

// create enquiry
router.post('/create-enquiry', enquiryController.createEnquiryController);

// update enquiry status
router.put('/enquiry/:id/status', verifyAdmin, enquiryController.updateEnquiryController);

// get all enquiries
router.get('/all-enquiries', jwtMiddleware, verifyAdmin, enquiryController.getEnquiryController);

// get all comments
router.get('/all-comments', verifyAdmin, commentController.getCommentsController);

// delete a user
router.delete('/user/:id/delete', verifyAdmin, userController.deleteUserController);

// delete a college
router.delete('/college/:id/delete', verifyAdmin, collegeController.deleteACollege);

// add a course to an existing college
router.post('/add-course', verifyAdmin, courseController.addCourseToCollege);

// delete a coruse
router.delete('/course/:collegeId/:courseId/delete', verifyAdmin, courseController.deleteCourse);

// update comment status to inactive
router.put("/comment/:commentId/inactive", verifyAdmin, commentController.setCommentInactive);

// change admin password
router.put('/change-password', adminController.changeAdminPassword);

// create new admin
router.post('/create-admin', verifyAdmin, adminController.createNewAdmin);

// success testimonials
router.get('/success-testimonials', testiController.getSuccessTestimonials);

// get active alerts
router.get('/active-alerts', jwtMiddleware, alertController.getActiveAlertsController);

module.exports = router