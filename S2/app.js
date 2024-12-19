const express = require('express');
const { connectDB } = require('./config/database');
const app = express();
const { adminAuth } = require('./middlewares/auth');
const { userAuth } = require('./middlewares/user');
const User = require('./models/user');

app.use(express.json());

app.delete('/deleteUser', async (req, res) => {
  const userId = req.body.userId;
  try {
    const users = await User.findByIdAndDelete(userId);
    console.log(users);
    res.send('user deleted successfully');
  } catch (error) {
    res.send(error.message);
  }
});

app.patch('/user', async (req, res) => {

  try {
    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, req.body);
    res.send('updated successfully');
  } catch (error) {
    res.send('something went wrong');
  }
});

app.get('/findUser', async (req, res) => {
  try {
    const users = await User.findOne({ emailId: req.body.emailId });
    console.log(users);
    if (users === null) {
      res.send('user not found');
    } else {
      res.send(users);
    }
  } catch (error) {
    res.send(error.message);
  }
});

app.get('/feed', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post('/user/signup', async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  //const user=new User()
  // const user = new User({
  //   firstName: 'ravi',
  //   lastName: 'badami',
  //   emailId: 'ravi@gmail.com',
  //   password: 'ravi',
  //   age: 33,
  //   gender: 'M',
  // });

  /*
   * when you do this new collection will be saved in the database*/
  await user.save();
  res.send('Insterted successfully');
});

console.log('1. Before app.listen()');
app.use('/', (err, req, res, next) => {
  console.log('global error');
  if (err) {
    res.status(501).send(err.message);
  }
  res.send('global message');
});
connectDB()
  .then(() => {
    console.log('connected successfully');
    app.listen(3000, () => {
      console.log('listening to the port 3000');
    });
  })
  .catch((err) => {
    console.log('cannot connect db because', err.message);
  });

console.log('2. After app.listen()');
/** from there all the notes 
app.get('/user/tryerror', (req, res) => {
  try {
    throw new Error('ravi');
    res.send('trying error');
  } catch (error) {
    res.status(501).send('handling error');
  }
  // console.log('user error');
});
app.use('/admin', adminAuth);
app.get('/user-:id-:name', (req, res) => {
  res.send(req.params);
});

// // /*
//  * Anything come before fly word will work and fly should be at the last.
//  * A word should end with fly
//  */
// app.get(/.*fly$/, (req, res) => {
//   res.send('fly is working');
// });

// /*
//  * Anything that contains a works
//  */
// // app.get(/a/, (req, res) => {
// //   res.send('/a/ is working');
// // });
// /*
//  * similar to ab?c but here its (bc) both together
//  */
// app.get('/a(bc)?de', (req, res) => {
//   res.send('a(bc)?de working');
// });

// /*
//  * abc or abRANDOMc. Because anything can come between ab and c.but abc must be complsury present
//  * in the order or a b c.
//  */
// app.get('/ab*c', (req, res) => {
//   res.send('ab*c working');
// });

// /*
//  * abc or abbbc. Because b char can occur any number of times
//  */
// app.get('/ab+c', (req, res) => {
//   res.send('ab+c working');
// });
// /*
//  * Either ac or abc because the char on which ? is applied is optional
//  */
// app.get('/ab?c', (req, res) => {
//   res.send('ab?c working');
// });

// app.post('/', (req, res) => {
//   res.send('sendig love');
// });

// app.use('/test', (req, res) => {
//   res.send('testing');
// });

// /*
//  * One route can have multiple route handlers */
// app.use(
//   '/:userId/:country/:age',
//   (req, res, next) => {
//     /*
//      * If you dont send the response at the end then the client
//      * will keep requesting and it hangs around until the timeout is hit*/
//     console.log('First callback');
//     next();

//     res.send(req.params);
//     next();
//   },
//   (req, res) => {
//     console.log('Second callback');

//     // res.send('second one');
//   }
// );
// app.get('/admin/data', (req, res) => {
//   res.send('All the data for admin');
// });

// /*
//  * userAuth function can be directly written like this also*/
// app.get('/user/data', userAuth, (req, res) => {
//   res.send('All the user data');
// });
// /*
//  * handles all type of errors in the routes*/

// */
