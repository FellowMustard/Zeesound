import { Request, Response } from "express";
import Author from "../Model/Author";

export const handleSearchAuthor = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const result = await Author.find({
      name: { $regex: name, $options: "i" },
    }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateAuthor = async (req: Request, res: Response) => {
  const { name, country, countryFlag, pic } = req.body;
  if (!name || !country || !countryFlag || !pic)
    return res
      .status(400)
      .json({ message: "Please provide full credentials!" });

  const duplicate = await Author.findOne({
    name: { $regex: new RegExp(name, "i") },
  }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Author is Already Exist." });
  try {
    const author = await Author.create({
      name,
      country,
      countryFlag,
      pic,
    });

    res
      .status(201)
      .json({ message: `Author ${author.name} successfully created` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
