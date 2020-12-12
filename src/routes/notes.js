const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require ('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/add');
});

router.post('/notes/add', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please write a title' });
    }
    if (!description) {
        errors.push({ text: 'Please write a description' });
    }
    if (errors.length > 0) {
        res.render('notes/add', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user._id;
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes/list');
    }

});

// DEPRECATED -> INSECURE (Express-handlerbars 3.0.0)
/* router.get('/notes/list', async(req, res) => {
    const notes = await Note.find();
    res.render('notes/list', { notes });
}); */

// Express-handlerbars 3.1.0
router.get('/notes/list', isAuthenticated, async(req, res) => {
    await Note.find({user: req.user._id}).sort({ date: 'desc' })
        .then(documentos => {
            const contexto = {
                notes: documentos.map(documento => {
                    return {
                        _id: documento._id,
                        title: documento.title,
                        description: documento.description
                    }
                })
            }
            res.render('notes/list', {
                notes: contexto.notes
            })
        })
});

router.get('/notes/edit/:_id', isAuthenticated, async(req, res) => {
    const note = await Note.findById(req.params._id)
        .then(data => {
            return {
                title: data.title,
                description: data.description,
                _id: data._id
            }
        });
    res.render('notes/edit', { note })
});

router.put('/notes/edit/:_id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params._id, { title, description });
    req.flash('success_msg', 'Note Updates Successfully');
    res.redirect('/notes/list');
});

router.delete('/notes/delete/:_id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params._id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes/list');
});

module.exports = router;