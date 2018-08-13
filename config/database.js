if(process.env.NODE_ENV === 'production'){
 module.exports = {
 	mongoURI : 'mongodb://<mahmudul>:<mahmudul>@ds261678.mlab.com:61678/vidjot_prod'
 }
}else{
  module.exports = {
  	mongoURI : 'mongodb://localhost:27017/vidjot-dev'
  }
}
