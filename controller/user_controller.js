// const User = require('../models/user')
const User = require('../models/user')

module.exports.profile = function(req,res ){
    return res.end('<h1>user popup</h1>')
}
//render sign up page
module.exports.signUp = function(  req , res){
    return res.render('user_sign_Up',{
        title : "codeial | sign up"
    })
}
 //render sign in page
module.exports.signIn = function(  req , res){
    return res.render('user_sign_in',{
        title : "codeial | sign in"
    })
}

//get the sign up data

module.exports.create =async function(req, res){
    console.log("++++++++++++++++++++++++++++++++++++++++++++",req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }

    const user = await User.findOne({email:req.body.email})
    // console.log(user);
    if(!user||[]){
        const newUser =await User.create({name:req.body.name,email: req.body.email})
        console.log(newUser);
        return res.redirect('/users/signin')
    }else{
        return res.redirect('back')
    }
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){console.log('error in finding user in signing up');return}

    //    if(!user){
    //         User.create(req.body,function(err, user){
    //             if(err){console.log('error in creating user in signing up');return}
    //             return res.redirect('/users/signin')
    //         })
    //     }else{
    //         return res.redirect('back')
    //     }
    // })


}

//get the sign in data
module.exports.createSession = function(req, res){

}