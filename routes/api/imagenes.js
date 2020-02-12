var express = require('express');
var router = express.Router();

var uuid = require('uuid/v4');

var imagenCollection = [];

var imagenStruct = {
  id:0,
  title:'',
  url:'',
  tthumbnailUrl:'',
  album:''
}

imagenCollection.push(
  Object.assign(
    {},
    imagenStruct,
    {
      id:uuid(),
      title:'Goku',
      url:'https://i.pinimg.com/originals/28/a9/7a/28a97aa389dc5598a99fa7bd2abf9a32.jpg',
        tthumbnailUrl:'https://i.pinimg.com/originals/28/a9/7a/28a97aa389dc5598a99fa7bd2abf9a32.jpg',
        album:'Goke'
    }
    )
);

router.get('/:id', (req, res, next) => {
  if  (!req.params.id) return next();
  var id = req.params.id;
  var imagen = imagenCollection.filter((e, i) => {
    return (e.id === id);
  });//filter

  if (imagen.length > 0) {
    res.status(200).json(imagen[0]);
  } else {
    res.status(404).json({});
  }

})// get one by Id
router.get('/', (req, res, next)=>{
  // obtiene la coleccion de personas
  res.status(200).json(imagenCollection);
});// get



router.post('/', (req, res, next)=>{
  var newimagen = Object.assign(
    {},
    imagenStruct,
    {id:uuid()},
    req.body
  );
  imagenCollection.push(newimagen);
  res.status(200).json(newimagen);
}); //post


router.put('/:id', (req, res, next)=>{
  var id = req.params.id;
  var modifiedimagen = {};
  var originalimagen = {};
  imagenCollection = imagenCollection.map( (e, i) => {
    if(e.id === id){
      originalimagen = Object.assign({}, e);
      return modifiedimagen = Object.assign({}, e, req.body);
    }
    return e;
  });//map
  res.status(200).json({ o: originalimagen, m: modifiedimagen});
});//put

router.delete('/:id', (req, res, next)=>{
  var id = req.params.id;
  var deletedimagen = {};
  imagenCollection = imagenCollection.filter((e,i)=>{
    if(e.id === id){
      deletedimagen = Object.assign({},e);
      return false;
    }
    return true;
  });//filter
  res.status(200).json({d:deletedimagen, c:imagenCollection});
});//delete

module.exports = router;
