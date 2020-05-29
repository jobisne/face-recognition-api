const handleRegister = (req, res, bcrypt, db) => {
    const { email, password, name } = req.body;
  if(!email || !password || !name) {
    return res.status(400).json('incorrect form submission')
  }
    const hash = bcrypt.hashSync(password)
    // console.log(email);
    db.transaction(trx => {
      trx.insert({
        hash:hash,
        email: email[0]
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx("users")
        .returning("*")
          .insert({
            name: name[0],
            email: loginEmail[0],
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      //to add transaction 
      .then(trx.commit)
      .catch(trx.rollback)
    })
      .catch(error => {
        res.status(400).json("unable to register");
      });
  }

module.exports = {
    handleRegister:handleRegister
}