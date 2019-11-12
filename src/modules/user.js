import Router from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

const router = Router();

const users = [];

router.post('/register', async(req, res) => {
  const { username, email, password } = req.body;

  const empty = _.isEmpty(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if(empty){
      return res.status(400).json({
        error: 'Body can not be empty'
      });
    }

    users.push({
        username: username,
        email: email,
        password: hashedPassword
      });

    return res.status(200).json({
        success: true,
        message: 'Your account has been created successfully, you can now log in'
    });

  } catch(error){
    return res.status(400).json({
        success: false,
        message: 'Something went wrong, please try again!'
    });
  }
});

router.post('/login', async(req, res) => {
  const { username, password } = req.body;

  const empty = _.isEmpty(req.body);

  const user = users.filter(user => user.username === username);

  const passwordMatch = await bcrypt.compare(password, user[0].password);

  try {
    if(empty){
      return res.status(400).json({
        error: 'Body can not be empty'
      });
    } else if(!user){
      return res.status(401).json({
        error: 'Sorry user not found, ensure that the username is correct!'
      });
    } else if(!passwordMatch){
      return res.status(401).json({
        error: 'Passwords do not match!'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'You have successfully logged in',
      token: uuid.v4()
    });

  } catch(error){
    return res.status(400).json({
        success: false,
        message: 'Something went wrong, please try again!'
    });
  }

});

module.exports = router;
