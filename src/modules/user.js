import Router from 'express';
import _ from 'lodash';

const router = Router();

const users = [];

router.post('/register', async(req, res) => {
  const { username, email, password } = req.body;

  const empty = _.isEmpty(req.body);

  try {
    if(empty){
      return res.status(400).json({
        error: 'Body can not be empty'
      });
    }

    users.push({
        username: username,
        email: email,
        password: password
      });

    return res.status(200).json({
        success: true,
        message: 'Your account has been created successfully, you can now log in'
    });

  } catch(error){
    return res.status(400).json({
        success: false,
        message: 'Something went wrong, please try again!'
    })
  }
});

module.exports = router;
