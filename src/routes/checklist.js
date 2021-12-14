const express = require('express');
const router = express.Router();

const Checklist = require('../models/checklist');


router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (error) {
        console.log(error)
        res.status(200).render('pages/error', { error: 'Erro ao exibir as Listas' })
    }
})

router.post('/', async (req, res) => { //editar a tarfea que irá retornar para a pagina principal
    let { name } = req.body.checklist;
    const checklist = new Checklist({name});
    try {
        await checklist.save();
        res.redirect('/checklist');
    } catch (error) {
        res.status(422).render('checklists/new', {checklist: {...checklist, error}})
    }
})

router.get('/new', async (req, res) => {
    try {
        const checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Erro ao carregar formulário'});
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Erro ao exibir a edição Listas de tarefas'});
    }
})

router.get('/:id', async (req, res) => { //rota quando clico em 'ver'
    try {
        const checklists = await Checklist.findById(req.params.id).populate('tasks'); //isso faz com q o mongoose que vai tambem mostrar as tasks, alem do checklist
        res.status(200).render('checklists/show', { checklists: checklists })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas de tarefas' })
    }
})

router.put('/:id', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = await Checklist.findById(req.params.id);
    try {
        await checklist.update({name});
        res.redirect('/checklist');
    } catch (error) {
        res.status(422).json(error);
        const errors = error.erros;
        res.status(422).render('checklist/edit', {checklist: {...checklist, errors}});
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklist');
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao deletar a Lista de tarefas' }) //passou path, não url
    }
})




module.exports = router;