const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor (courseId){
    const course = await Course.updateOne({_id:courseId},{
        $set:{
            'author.name': 'John Omondi'
        }
    });
}
//updateAuthor('5bdafbb38e6b3a2404f6650a')

async function addAuthor (courseId,author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();

}
//addAuthor('5bdb04b27de3342d7091177b',new Author ({name:'Emy'}))

async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('5bdb04b27de3342d7091177b','5bdb0697516a564858f1ff20')
/*createCourse('Node Course',[
    new Author ({ name: 'Odondi James'}),
    new Author({ name:'Kimaru Kirwa'})
]);*/
