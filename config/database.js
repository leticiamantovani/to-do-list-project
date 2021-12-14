const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('conectado ao mongo'))
}