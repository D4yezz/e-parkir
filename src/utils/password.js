import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  console.log("ini pw", password);
  return await bcrypt.hash(password, 10);
}

export async function verify(password, hash) {
  return await bcrypt.compare(password, hash);
}
