const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '85485466dd9d45bcb6b00843dbbce055'
});

const handleApiCall = ( req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('unable to fetch image'))
}




const handleImage = (req, res, db) => {
    const { id } = req.body;
    let count;
    db.select("*")
      .from("users")
      .where( 'id', '=', id )
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(400).json('error fecthing data'))
  
  }

  module.exports = {
      handleImage: handleImage,
      handleApiCall: handleApiCall
  }