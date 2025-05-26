import bcrypt from 'bcryptjs';
export const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};
export const comparePassword = (raw, hashed) => {
    return bcrypt.compare(raw, hashed);
};
