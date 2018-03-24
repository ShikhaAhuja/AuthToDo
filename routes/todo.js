var dbTodo = require('../models/task');

exports.insertTask = (req,res)=>{
    if(!req.body.taskName)
    {
        res.json({
            success: false,
            message: 'Please Enter Task'
        });
    }
    else
    {
        var newTask = new dbTodo({
            email: req.decoded.email,
            taskName: req.body.taskName,
        });

        newTask.save((err,data)=>{
            if(err)
            {
                res.json({ success: false , message: 'Error in Database'});
            }
            else
            {
                res.json({ success: true , message: 'New Task Entered'});
            }
        });
    }
};