const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/public`))

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f234b52a68eb49368d2893f2c7795bc7',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const cats = []

app.get('/', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      }
})

app.post('/api/cats', (req, res) => {
    let {name} = req.body
     rollbar.critical(`New kitty added to the list of shame! Welcome: ${name}`)
    const index = cats.findIndex(cat => {
        return cat === name
    })
 
    try {
        if (index === -1 && name !== '') {
            cats.push(name)
            res.status(200).send(cats)
        } else if (name === ''){
            rollbar.warning("dude. please follow directions. type a name!")
            res.status(400).send('You must enter a fluffy kitty name.')
        } else {
            rollbar.warning("Woah! Don't duplicate my kitties, please.")
            res.status(400).send('That kitty already exists.')
        }
    } catch (err) {
        console.log(err)
        rollbar.error("Bloop: error detected...")
    }
 })

app.listen(4000, () => console.log('up on 4000'))