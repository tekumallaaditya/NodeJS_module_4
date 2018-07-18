var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

exports.addstory = function(req, res){
   var title=req.body.title;
   var content=req.body.content;
   var summary=req.body.summary;
   var imageLink=req.body.imageLink;
   var author =req.session.username;
   console.log("Author is :"+author);

   var newStory=new Story();
   newStory.author=author;
   newStory.title=title;
   newStory.content=content;
   newStory.summary=summary;
   newStory.imageLink=imageLink;


   newStory.save(function(err, savedStory){
       console.log('this is the error->' + err );
       if(err){
           console.log('could not save the story');
           res.redirect('/new-story', {errorMessage: err} );
           //return status(500).send();
       } else {
           res.redirect('/new-story');
       }
   });
}
exports.stories = function(req, res){
    Story.find({}, function(err, stories){
        console.log('inside the stories function in story.js'+ stories.length + '' + stories[0].title);
        res.render('story', {stories: stories, session: req.session});
    });
}