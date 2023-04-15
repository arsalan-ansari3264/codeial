// const User = require('../models/user')
const { session } = require("passport");
const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sigin");
      }
    });
  } else {
    return res.redirect("/users/signup");
  }
};
//render sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_Up", {
    title: "codeial | sign up",
  });
};
//render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "codeial | sign in",
  });
};

//get the sign up data

module.exports.create = async function (req, res) {
  // console.log("++++++++++++++++++++++++++++++++++++++++++++", req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user || []) {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(newUser);
    return res.redirect("/users/signin");
  } else {
    return res.redirect("back");
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
};

//get the sign in data
module.exports.createSession = async function (req, res) {
  //find the user
  const signuser = await User.findOne({ email: req.body.email });
  // ,function(err,user){
  // if(err){console.log('error in finding');return}
  // console.log(hy);
  //handle user found
  if (signuser) {
    //handle password which doesn't match
    if (signuser.password != req.body.password) {
      return res.redirect("back");
    }
    //handle session creation
    res.cookie("user_id", signuser.id);
    return res.redirect("/users/profile");
  } else {
    //handle user not found
    return res.redirect("back");
  }
  //  });
};

// sign in and create session for the user

// module.exports.createSession = function(req,res){
//   return res.redirect('/')
// }


module.exports.destroySession = function(req,res){
  req.logout();

  return res.redirect('/')
}