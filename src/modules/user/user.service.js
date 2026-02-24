import { UserModel } from "../../DB/model/user.model.js";

export const profile = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    throw new Error("No User Found", { cause: { status: 404 } });
  }
  return user;
};

export const getProfile = async (userId) => {
  const user = await UserModel.findByPk(userId, {
    attributes: { exclude: "role" },
  });
  if (!user) {
    throw new Error("No User Found", { cause: { status: 404 } });
  }
  return user;
};

export const updateProfile = async (userId, inputs) => {
  const [user, created] = await UserModel.upsert(
    { id: userId, ...inputs },
    { validate: false },
  );
  return { user, created };
};
