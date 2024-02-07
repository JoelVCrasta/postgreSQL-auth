require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Models');

const User = db.users;

//user signup
const signup = async (req, res) => {
  //hashing user password n=and sending to db
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      username,
      email,
      password: hashedPassword,
    };

    const newUser = await User.create(data);

    // generate a jwt token/cookie
    if (newUser) {
      console.log('Secret Key:', process.env.secretKey);
      let token = jwt.sign({ id: newUser.id }, process.env.secretKey, {
        expiresIn: 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
      });
      console.log('user', JSON.stringify(newUser, null, 2));
      console.log('token', token);
      //return res.status(201).send(newUser);
      res.redirect('/');
    } else {
      res.status(409).send('Error creating user');
    }
  } catch (error) {
    console.log(error);
  }
};

//user login
const login = async (req, res) => {
  // compare if password matches
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(user);

    if (user) {
      const passMatches = await bcrypt.compare(password, user.password);

      // if password matches generate a token/cookie
      if (passMatches) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 24 * 60 * 60 * 1000,
        });

        res.cookie('jwt', token, {
          maxAge: 24 * 60 * 60,
          httpOnly: true,
        });
        console.log('user', JSON.stringify(user, null, 2));
        console.log('token', token);
        //return res.status(201).send(user);
        res.redirect('/');
      } else {
        return res.status(401).send('authentication failed');
      }
    } else {
      return res.status(401).send('authentication failed');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
