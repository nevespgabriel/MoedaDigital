import jsonwebtoken from "jsonwebtoken";

const generateAccessToken = user => jsonwebtoken.sign(
    {
        _id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_PRIVATE_KEY,
    {
        expiresIn: "1h",
    }
);

const verifyAccessToken = token => jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY); //Se nn encontra retorna indefinido, se encontra retorna o token. Essa função verifica se o token é válido

export default {
    generateAccessToken,
    verifyAccessToken
}