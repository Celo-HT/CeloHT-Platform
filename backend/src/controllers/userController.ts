import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const registerUser = async (req: Request, res: Response) => {
  const { wallet, username } = req.body;
  if(!wallet) return res.status(400).json({error: "Wallet required"});

  try {
    const existing = await User.findOne({wallet});
    if(existing) return res.status(400).json({error:"Wallet already registered"});
    
    const user = await User.create({wallet, username});
    // JWT without expiration
    const token = jwt.sign({id:user._id, wallet:user.wallet}, JWT_SECRET);
    res.json({user, token});
  } catch(err:any) {
    res.status(500).json({error: err.message});
  }
};

// Dynamic stats
export const getStats = async (req: Request, res: Response) => {
  const usersCount = await User.countDocuments();
  res.json({
    users: usersCount,
    transactions: 52001,        // Placeholder; can integrate blockchain
    activeWallets: usersCount    // Placeholder
  });
};