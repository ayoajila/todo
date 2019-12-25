module.exports = function(app) {
  app.get('/todo', hello) 
  app.get('/index', index) 
}

const hello = (req, res, next) => {
  try {
    res.render('index', { title: 'Yo yo yo this a app created by Anu' })
  } 
  catch (e) {
    next(err)
  }
}

const index = (req, res, next) => {
  try {
    res.render('fun', { title: 'This is an index page' })
  } 
  catch (e) {
    next(err)
  }
}