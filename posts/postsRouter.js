const db = require("../data/db");

const router = require('express').Router()



router.get("/", (req, res) => {
    db.find()
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })

})

router.get('/:id', (req, res) => {
    
    db.findById(req.params.id)
    .then(posts => {
        const post = posts[0]
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
        if (!title, !contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        }
    db.insert(req.body) 
    .then(posts => {
            res.status(201).json(posts)
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

router.post('/:id/comments', (req, res) => {
    
    db.insert(req.params.id)
    .then(posts => {
        if (req.params.id) {
            res.status(201).json(posts)
            
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    })
})





router.put('/:id', (req, res) => {
    const changes = req.body
    
    if (!title, !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else if (!req.params.id) {
        res.status(404).json({message: "The post with the specified ID does not exist." })
    }

    db.update(req.params.id, changes)
    .then(post => {
            res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be modified."})
    })
})


router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(deleted => {
    if (req.params.id) {
        res.status(200).json(deleted)
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }
  })
  .catch(error => {
      res.status(500).json({error: "The post could not be removed"})
  })
})





module.exports = router;
