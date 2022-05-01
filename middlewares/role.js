const isAdmin = async(req, res, next) => {
    const admins = ['admin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permiso de Administrador'
        });
    }
    next();
}

module.exports = { isAdmin }