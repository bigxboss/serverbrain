const clarifai = require ('clarifai');
const app = new Clarifai.App({
 apiKey: 'cf8a79dfcb6f41b29a531c96cecd849d'
});
 const handleAPIcall = (req, res) =>{
	app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
 }
const handleImage =  (db)=>(req, res) =>{
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get scores'))
}
module.exports ={
	handleImage: handleImage,
	handleAPIcall: handleAPIcall
};