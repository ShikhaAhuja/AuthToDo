var jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    if(!req.headers.token)
    {
        res.json({
            success: false,
            message: 'Please Provide Authentication Details'
        });
    }
    else
    {
        jwt.verify(req.headers.token, req.app.get('secret') , (err,data) => {
            if(err){
                res.json({ success: false , message: 'Verfication Failed'});
            }
            else{
                req.decoded = data;
                next();
            }
        });
    }
}