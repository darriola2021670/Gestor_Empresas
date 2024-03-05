import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject)=>{
        const payload = { uid };

        jwt.sign(
            payload,
            process.en.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                err ? (console.log(err), reject('No se pudo encontrar el roken')) : resolve(token);
            }
        );
    });
}