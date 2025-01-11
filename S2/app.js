const express = require('express');
const { connectDB } = require('./config/database');
const app = express();
const { adminAuth } = require('./middlewares/auth');
const { userAuth } = require('./middlewares/user');
const User = require('./models/user');
const { validateFormData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwtWebToken = require('jsonwebtoken');
const { userCookieAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

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

app.post('/login', async (req, res) => {
  try {
    // validateFormData(req);

    const { emailId, password } = req.body;
    const DbEmail = await User.findOne({ emailId: emailId });
    if (!DbEmail) {
      throw new Error('Invalid credentials');
    }
    const isPasswordSame = await bcrypt.compare(password, DbEmail.password);
    if (isPasswordSame) {
      const token = await jwtWebToken.sign({ _id: DbEmail._id }, 'blablabla');
      res.cookie('token', token);
      res.send('password correct logged in');
    } else {
      res.send('password is wrong');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/sendConnectionRequest', userCookieAuth, (req, res) => {
  res.send('The request connectino is sent by ' + req.user.firstName);
});

app.get('/profile', userCookieAuth, async (req, res) => {
  const user = req.user;
  console.log(user);
  // console.log(token);
  res.send('cookie found');
});

app.patch('/user/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    if (data.skills.length > 10) {
      throw new Error('Skills cannot be more then 10');
    }
    const UPDATE_ALLOWED = ['skills', 'gender', 'photoUrl', 'about'];
    const isAllowed = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));

    if (!isAllowed) {
      throw new Error('Update not allowed');
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send('updated successfully');
  } catch (error) {
    res.send('Cannot update' + error.message);
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
  const { firstName, emailId, password, gender } = req.body;

  try {
    validateFormData(req);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      emailId,
      password: passwordHash,
      gender,
    });

    // Save the user to the database
    await user.save();
    res.send('Inserted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
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
