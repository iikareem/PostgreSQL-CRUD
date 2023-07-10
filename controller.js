const pool = require('./src/db');
const queries = require('./src/queries');
const {values} = require("pg/lib/native/query");

exports.getStudents = (req,res) =>{
    pool.query(queries.getStudent , (error , results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

exports.getStudentID = (req,res) =>{
    const values = [req.params.id];
    pool.query(queries.getStudentID , values, (error , results)=>{
        if (error) throw error;
        console.log(results.rows[0].name);
        res.status(200).json(results.rows);
    });
};

exports.checkEmailExits = (req,res,next) =>{
    const {email} = req.body;
    const values = [email];

    pool.query(queries.checkEmailExits , values, (error , results)=>{
         console.log(results.rows[0].count);
         const n = results.rows[0].count;
            if (n>0) {
                console.log(n)
                return res.send("This email is already used");
            }
            else {
                next();
            }
    });

}

exports.checkUserExits = (req,res,next) =>{
    const {id} = req.params;
    const values = [id];

    console.log("checkUserExits")

    pool.query(queries.checkUserExits , values, (error , results)=>{
        const n = results.rows[0].count;
        if (n>0) {
            next();
        }
        else {
            return res.send("NO USER WITH THIS ID");

        }
    });

}

exports.addStudents = (req,res) =>{
    const {name,email,age,dob} = req.body;
    const values = [name,email,age,dob];

    // console.log("hola")
    pool.query(queries.addStudents ,values, (error , results)=> {

        if (error) {
            throw error;
        }
        else {
            return res.status(201).send("Student Created Successfully")

        }
    });


}

exports.deleteStudentID = (req,res) =>{
    const {id} = req.params;
    const values = [id];

    pool.query(queries.deleteUser ,values, (error , results)=> {

        if (error) {
            throw error;
        }
        else {
            return res.status(201).send("Student Deleted Successfully")

        }
    });

}

exports.updateStudent = (req,res) =>{
    const { name, email, age, dob } = req.body;


    let q = queries.updateStudent;
    const values = [];

    if (name){
        q += ' name = $1,';
        values.push(name);
    }
    if (email){
         q += ' email = $' + (values.length + 1) + ',';
           values.push(email);
            }

    if (age) {
        q += ' age = $' + (values.length + 1) + ',';
        values.push(age);
    }
    if (dob) {
        q += ' dob = $' + (values.length + 1) + ',';
        values.push(dob);
    }
    // Remove the trailing comma from the query
    q = q.slice(0, -1);

    q += ' WHERE id = $' + (values.length + 1);
    values.push(req.params.id);


    // console.log(q);
    // console.log(values)

    pool.query(q, values, (error, results) => {
        if (error) {
            throw error;
        }
        return res.send('Student updated successfully');
    });

}

exports.ShowGPA = (req,res) =>{
    pool.query(queries.ShowGPA, (error , results)=> {

        if (error) {
            throw error;
        }
        else {
            return res.status(200).send(results.rows)

        }
    });
}



