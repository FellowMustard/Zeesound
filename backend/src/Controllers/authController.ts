import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/User";

export const handleRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Please provide full credentials!" });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email is already taken." });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      password: hashedPwd,
    });

    res.status(201).json({ message: `New User ${username} created!` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please provide full credentials!" });
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Wrong Email / Password." });
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10m" }
    );
    const newRefreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((token: any) => token !== cookies.jwt);

    if (cookies.jwt) res.clearCookie("jwt", { httpOnly: true, secure: true });

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: foundUser.username,
      email: foundUser.email,
      token: accessToken,
      likedSong: foundUser.likedSongs,
    });
  } else {
    res.status(401).json({ message: "Wrong Username / Password." });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt: any) => rt !== refreshToken
  );

  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.sendStatus(204);
};
