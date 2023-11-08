const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        const validPassword = await userData.checkPassword(req.body.password);

        if (!userData || !validPassword) {
            res.status(400).json({ message: 'Incorrect username or password.'});
            return;
        }

        req.session.save(() => {
            res.session.loggedIn = true;
            res.status(200).json( {user: userData, message: 'Logged in successfully!'})
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;