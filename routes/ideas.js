const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//Load Helpers
const {ensureAuthenticated} = require('../helpers/auth');

//Load Idea Model
require('../models/Ideas');
const Idea = mongoose.model('ideas');


module.exports = router;


//Idea Index Page
router.get('/',ensureAuthenticated,(req , res) => {

   Idea.find({user: req.user.id})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index' , {
      	ideas: ideas,

      });
    })

});

// router.get('/:page', function(req, res, next) {
//     var perPage = 1
//     var page = req.params.page || 1

//     Idea
//     .find({user: req.user.id})
//     .skip((perPage * page) - perPage)
//     .limit(perPage)
//     .exec(function(err, ideas) {
//         Idea.count().exec(function(err, count) {
//             if (err) return next(err)
//             res.render('ideas/index', {
//                 ideas: ideas,
//                 current: page,
//                 pages: Math.ceil(count / perPage)
//             })
//         })
//     })
// })

//Add Idea Form
router.get('/i/add',ensureAuthenticated,(req , res) => {
   //res.send('About');
   res.render('ideas/add');
});

//Edit Idea Form
router.get('/edit/:id',ensureAuthenticated,(req , res) => {
   Idea.findOne({
   	_id: req.params.id
   })
   .then(idea => {
      if(idea.user != req.user.id){
        req.flash('error_msg','Not Authorized');
        res.redirect('/ideas');
      }
   	  else{
        res.render('ideas/edit',{
        idea: idea
      });
      }
   })

});

//Add Process Form
router.post('/',ensureAuthenticated,(req , res) => {
  let errors = [];

  if(!req.body.title){
  	errors.push({text: 'Please Add A Title'});
  }
  if(!req.body.details){
  	errors.push({text: 'Please Add Some Details..'});
  }

  if(errors.length > 0){
  	res.render('ideas/add',{
  		errors: errors,
  		title: req.body.title,
  		details: req.body.details
  	});
  }else{
  	//res.send('Passed');
  	const newUser = {
  		title: req.body.title,
  		details: req.body.details,
      user: req.user.id
  	}
  	new Idea(newUser)
  	.save()
  	.then(idea => {
  		req.flash('success_msg','Ideas Added Successfully..');
  		res.redirect('/ideas');
  	})
  }
});


//Edit Form Process
router.put('/:id',ensureAuthenticated,(req , res) => {
   Idea.findOne({
   	_id: req.params.id
   })
   .then(idea => {
   	idea.title = req.body.title,
   	idea.details = req.body.details;

   	idea.save()
   	.then(idea => {
   		req.flash('success_msg','Ideas Updated Successfully..');
   		res.redirect('/ideas');
   	});
   });
});

//Delete Idea
router.delete('/:id',ensureAuthenticated, (req , res) => {
   Idea.remove({_id: req.params.id})
    .then(() => {
    	req.flash('success_msg','Ideas Deleted Successfully..');
    	res.redirect('/ideas');
    })
});


