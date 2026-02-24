import { UserModel } from "../../DB/model/user.model.js";

export const signup = async (inputs) => {
  const { name, email, password } = inputs;
  const userExist = await UserModel.findOne({ where: { email } });
  if (userExist) {
    throw new Error("Email already exist", { cause: { status: 409 } });
  }
  const user = await UserModel.build({ name, email, password });
  await user.save({ validate: true });
  return user;
};

export const login = async (inputs) => {
  const { email, password } = inputs;
  const user = await UserModel.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw new Error("invalid user credentials", { cause: { status: 404 } });
  }

  return user;
};
