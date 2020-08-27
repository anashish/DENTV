const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/details/:id', async (req, res) => {
  try {
    const data = await fetch(`http://player.vimeo.com/video/${req.params.id}/config`).then(response => response.json())
    return res.send(data)
  } catch (err) {
    return res.send({
      status: 'Failed',
      err,
    })
  }
})

app.get('/*', async (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

// eslint-disable-next-line no-console
app.listen(35678, () => console.log('Server running at localhost:35678'))
