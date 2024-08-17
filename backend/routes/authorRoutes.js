import express from 'express'
import Author from '../models/AuthorsSchema.js'

const router = express.Router()

router.get('/', (req, res) => {
    const authors = [
        {
            _id: '123',
            name: 'Marco',
            surname: 'Cecchini',
            email: '0vq7k@example.com',
            birthDate: '01/01/2000',
            avatar: 'https://picsum.photos/200'
        },
        {
            _id: '456',
            name: 'Lautaro',
            surname: 'Cecchini',
            email: '0vq7k@example.com',
            birthDate: '01/01/2000',
            avatar: 'https://picsum.photos/200'
        }
    ]
    res.send(authors)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(`Qui andranno i dati  del post con id ${id}`)
})

router.post('/', async (req, res) => {
    const author = new Author(req.body)
    await author.save();
    res.send(author)
})

router.put('/:id', (req, res) => {
    res.send(`verra modificato lo user con id ${req.params.id} con i dati: ${JSON.stringify(req.body)}`)
})

router.delete('/:id', (req, res) => {
    res.send(`verra eliminato lo user con id ${req.params.id}`)
})

export default router