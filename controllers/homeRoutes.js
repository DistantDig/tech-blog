const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {blogs, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;