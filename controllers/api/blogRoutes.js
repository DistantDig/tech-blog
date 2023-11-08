const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'user_id',
                        'text'
                    ],
                    include: [
                        {
                            model: User,
                            attributes: [
                                'username'
                            ]
                        }
                    ]
                }
            ]
        });
        const blog = blogData.get({ plain: true });
        console.log(blog);
        res.render('blog', {blog});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({
            user_id: req.body.user_id,
            text: req.body.text
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;