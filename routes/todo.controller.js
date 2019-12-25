module.exports = function(app) {
  app.get('/todo', hello)
}

const hello = (req, res, next) => {
  try {
    res.render('index', { title: 'Yo yo yo this a app created by Anu' })
  } 
  catch (e) {
    next(err)
  }
}