const express = require('express');

const mongoose = require('mongoose');

const app = express();

const Note = require('./models/note'); //shema eluthi itukkira type of file //

const notesRouter = require('./routes/notes'); // module ah export pannina routing ah call panram//

// const methodOverride = require('method-override');

require('dotenv').config();

// ***mongodb Atlas ah connect panrathu***//
try {
    mongoose.connect("mongodb+srv://KumarNivi:root029@cluster0.rfhv2ah.mongodb.net/?retryWrites=true&w=majority", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    });
    console.log("Database Connected Successfully"); 
  } catch (err) {
    console.log("Database Not Connected");
  }

  app.set('view engine', 'ejs'); 

  app.use(express.urlencoded({extended:false}));

  // app.use(methodOverride('_method'));

// we want to do routing
app.get('/', async (req,res) => {
    const notes = await Note.find().sort('-createdAt')
   res.render('index',{notes: notes});
});


// create server
app.use('/', notesRouter);
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server Has Started`);
});

