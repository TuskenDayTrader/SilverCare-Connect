import jwt from "jsonwebtoken";
import { User } from "./models/User.js";

export function authenticateToken(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = await User.findByPk(payload.id);
    if (!req.user) return res.sendStatus(403);
    next();
  });
}
