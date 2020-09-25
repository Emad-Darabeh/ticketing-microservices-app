import express from 'express';
import currentUser from '../middleware/current-user';

/**
 * @constant CURRENT_USER_ROUTER
 */
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  const currentUser = req.currentUser || null;
  res.send({ currentUser });
});

export default router;
