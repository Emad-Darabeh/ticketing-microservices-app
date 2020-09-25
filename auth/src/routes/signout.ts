import express from 'express';

/**
 * @constant SIGNOUT_ROUTER
 */
const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;
  res.send({});
});

export default router;
