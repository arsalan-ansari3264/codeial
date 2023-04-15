module.exports.home = function(req,res){
    // console.log(req.cookies);
    res.cookie('usr_id',25);
    // console.log(req.cookies);
    // return res.end('<H1>express is holding up for codial</H1>')
    return res.render('home',{
        title : "Home"
    })
}   