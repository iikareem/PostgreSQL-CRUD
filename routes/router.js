const express = require('express');
const router = express.Router();
const controller = require('../controller');




router.route('/')
    .get(controller.getStudents)
    .post(controller.checkEmailExits,controller.addStudents);

router.route('/ShowGpa').get(controller.ShowGPA);


router.route('/:id')
    .get(controller.getStudentID)
    .put(controller.checkUserExits,controller.checkEmailExits,controller.updateStudent)
    .delete(controller.checkUserExits,controller.deleteStudentID);




module.exports = router;