const express = require('express');

const checklistDependentRoute = express.Router();
const simpleRouter = express.Router();

const Checklist = require('../models/checklist');
const Task = require('../models/task');

checklistDependentRoute.get('/:id/tasks/new', async (req, res) =>{
    try {
        const task = Task();
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task});
    } catch (error) {
        res.status(422).render('pages/error', { errors: 'Erro ao carregar o formulário'})
    }
})

simpleRouter.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        const checklist = await Checklist.findById(task.checklist);
        const taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.task.slice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(422).render('pages/error', { errors: 'Erro ao remover um formulário' });
    }
})

checklistDependentRoute.post('/:id/tasks', async (req, res) => {
    let { name } = req.params.task;
    const task = new Task ({ name, Checklist: req.params.id });
    try {
        await task.save();
        const checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);        ///relação entre task e o checklist, inserir a task no checklist
        res.redirect(`checklists/${req.params.id}`)
    } catch (error) {
        const errors = error.errors;
        res.status(422).render('tasks/new', {task: { ...task, error}, checklistId: req.params.id});
        
    }
})

simpleRouter.put('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task);
        awaitctask.save();
        res.status(200).json({ task })
    } catch (error) {
        const erros = error.errors;
        res.status(422).json({ task: {...erros }})
    }
})

module.exports = { 
    checklistDependent: checklistDependentRoute,
    simple: simpleRouter
}