const {
  prisma
} = require('../generated/prisma-client/index')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cors())

app.post(`/showitems`, authenticateToken, async (req, res) => {
  const publishedPosts = await prisma.products()
  res.json(publishedPosts)
})

app.post(`/viewproduct`,authenticateToken, async (req, res) => {
  const publishedPosts = await prisma.product({
    productid: req.body.productid
  })
  res.json(publishedPosts)
})

app.post(`/userdefault1`,authenticateToken, async (req, res) => {
  let fav = 0,
    item = 0
  const publishedPosts = await prisma.favorites({
    where: {
      email: req.body.email,
      productid: req.body.productid
    }
  })
  if (publishedPosts[0] !== undefined) {
    fav = 1
  }
  const publishedPosts1 = await prisma.carts({
    where: {
      email: req.body.email,
      productid: req.body.productid
    }
  })
  if (publishedPosts1[0] !== undefined) {
    item = 1
  }

  if (fav == 1 && (item == 0))
    res.send("fav")
  else if ((fav == 0) && item == 1)
    res.send("item")
  else if (fav == 1 && item == 1)
    res.send("favitem")
  else
    res.send("null")
})

app.post(`/addfav1`, authenticateToken,async (req, res) => {
  const query = `
    mutation {
      createFavorite(
        data: {
          email: "` + req.body.email + `"
          productid: "` + req.body.productid + `"
          productdetail: { connect: { productid: "` + req.body.productid + `" } }
        }
      ) {
        email
        productid
      }
    }`
  await prisma.$graphql(query)
    .then(data => res.send("Favorite Added"))
    .catch(err => res.send(err))
})

app.post(`/delfav1`, authenticateToken,async (req, res) => {
  await prisma.deleteManyFavorites({

      email: req.body.email,
      productid: req.body.productid

    })
    .then(data => res.send("Favorite Deleted"))
    .catch(err => res.send(err))
})


app.post(`/additems1`,authenticateToken, async (req, res) => {
  const query = `
    mutation{
      createCart(data:{
        email:"thavasiva1999@gmail.com",
        productid:"` + req.body.productid + `"
        productdetail:{
          connect:{
            productid:"` + req.body.productid + `"
          }
        }
    
      }){
        email
        productdetail{
        productid
      }
      }
    }`
  await prisma.$graphql(query)
    .then(data => res.send("Item Added"))
    .catch(err => res.send(err))
})

app.post(`/delitems1`,authenticateToken, async (req, res) => {
  await prisma.deleteManyCarts({

      email: req.body.email,
      productid: req.body.productid

    })
    .then(data => res.send("Item Removed"))
    .catch(err => res.send(err))
})

app.post(`/getcart1`,authenticateToken, async (req, res) => {
  const query = `
      query{
        carts(where:{email:"` + req.body.email + `"}){
         productdetail{
           name
           productid
           price
           image
         }
       }
       }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts)


})

app.post(`/getwish1`,authenticateToken, async (req, res) => {
  const query = `
      {
        favorites(
          where:{
            email:"` + req.body.email + `"  
          }
        ){
          productid
          email
          productdetail{
            name
            price
            productid
            image
          }
        }
      }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts)


})

app.post(`/getorderviews`,authenticateToken, async (req, res) => {
  const query = `
      {
        cartsConnection(where: { email: "` + req.body.email + `" }) {
          aggregate {
            count
          }
        }
      }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts.cartsConnection.aggregate.count)


})

app.post(`/adminstatus`, async (req, res) => {
  const query = `
      {
        user(where:{email:"` + req.body.email + `"})
        {
          isadmin
        }
      }`
  const publishedPosts = await prisma.$graphql(query).catch(err => console.log(err))
  if (publishedPosts.user)
  {
  console.log(publishedPosts.user.isadmin)
    res.json(publishedPosts.user.isadmin)
  }
  else res.json("")

})

app.post(`/getuser`,authenticateToken, async (req, res) => {
  const query = `
      {
        user(where:{email:"` + req.body.email + `"})
        {
          name
          email
          isadmin
        }
      }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts.user)


})

app.post(`/checkaddress`,authenticateToken, async (req, res) => {
  var resp = "invalid"
  if (req.body.firstname !== null || undefined) {
    if (req.body.lastname !== null || undefined) {
      if (req.body.country !== null || undefined) {
        if (req.body.zip !== null || undefined) {
          if (req.body.address1 !== null || undefined) {
            resp = "valid"
            const query = `
                        mutation{
                          updateUser(where:{
                            email:"` + req.body.email + `"
                          },
                          data:{
                            address:"` + body + `"
                          }){
                            address
                            email
                            name
                          }
                        }`
            await prisma.$graphql(query)
            res.send(resp)

          }
        }
      }
    }
  }

})


app.post(`/adminstatus`,authenticateToken, async (req, res) => {
  const query = `
      {
        user(where:{email:"` + req.body.email + `"})
        {
          isadmin
        }
      }`
  const publishedPosts = await prisma.$graphql(query)
  if (publishedPosts.user.isadmin)
    res.send("true")
  else res.send("false")
})

app.post(`/addorders`,authenticateToken, async (req, res) => {
  const transid = Math.random()
  const query = `
      {
        carts(where:{
          email:"` + req.body.email + `"
        }){
          productid
        }
      }`
  const carts = await prisma.$graphql(query)
  carts.carts.map(async (cart) => {
    const query = `
        mutation{
          createOrder(data:{
            email:"` + req.body.email + `",
            productid:"` + cart.productid + `",
            rating:"false",
            remind:"false",
            return:"false",
            transid:"` + transid + `",
            owner:{
              connect:{
                email:"` + req.body.email + `"
              }
            },
            productdetail:{
              connect:{
                productid:"` + cart.productid + `"
              }
            }
          }){
            email
            productid
          }
        }
        `
    await prisma.$graphql(query)

  })
  carts.carts.map(async (cart) => {
    const query = `
      mutation{
        deleteManyCarts(where:{
          email:"thavasiva1999@gmail.com"
        }){
          count
        }
      }`
    await prisma.$graphql(query)
  })
  console.log("hi")
  res.json("Order Accepted")

})

app.post(`/searchproducts`,authenticateToken, async (req, res) => {
  const query = `
      {
        products(where:{
          name_contains:"` + req.body.key + `"
        }){
          productid
          price
          name
          image
          desc
        }
      }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts.products)
})

app.post(`/getmyorder`,authenticateToken, async (req, res) => {
  const query = `
      {
        orders(
          where:{
            email:"` + req.body.email + `"  
          }
        ){
          productid
          email
          productdetail{
            name
            price
            productid
            image
          }
        }
      }`
  const publishedPosts = await prisma.$graphql(query)

  res.json(publishedPosts.orders)


})



app.post(`/getordertransid`,authenticateToken, async (req, res) => {
  const query = `
      {
        orders(
          where:{
            email:"` + req.body.email + `"  
          }
        ){
          transid
        }
      }`
  await prisma.$graphql(query)
    .then(user => {
      let existing = []
      if (existing == null) existing = [];
      for (let i = 0; i < user.orders.length; i++) {
        existing.push((user.orders)[i].transid)
      }
      existing = [...new Set(existing)];
      res.send(existing)
    })


    .catch(err => res.send(err))
})

app.post(`/signup`, async (req, res) => {
  const bcrypt = require('bcrypt')

  let re,fal=0
    if(req.body.name===""){
        res.send("Name cannot be empty")
        fal=1
    }
    if(req.body.email===""){
        res.send("Email cannot be empty")
        fal=1
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
       
    }
    else{
      res.send("Invalid Email !!!")
      fal=1
    }
   
    if(req.body.password.length<6){
        res.send("Password must be greatre than 6 digits")
        fal=1
    }
   
    re = /[0-9]/;
      if(!re.test(req.body.password)) {
        res.send("Password must contain at least one number (0-9)!");
        fal=1
      }
      re = /[a-z]/;
      if(!re.test(req.body.email)) {
        res.send("Password must contain at least one lowercase letter (a-z)!");
        fal=1
       
      }
      
    
    if(req.body.password===req.body.email){
        res.send("Username and password cannot be same")
        fal=1
    }
    if(fal===0){
    bcrypt.hash(req.body.password, 10,async function (err, hash) {
      const query = `
      mutation{
        createUser(data:{
          email:"` + req.body.email + `",
          name:"` + req.body.name + `",
          password:"` + hash+ `"
        }){
          email
          name
          password
        }
      }`
  await prisma.$graphql(query)
  .then(body=> res.send("User created"))
            .catch(err => {
                console.log(err)
                res.send(err.result.errors[0].message)
            });
    });

    }

})


app.post(`/login`, async (req, res) => {
  const query = `
  query{
    user(where:{
      email:"`+req.body.email+`"
    }){
      email
      password
    }
  }`
  await prisma.$graphql(query)
.then(user => {
    if (!user.user.password) {
        res.json({status:"Invalid Username"});
    }

    bcrypt.compare(req.body.password, user.user.password, function (err, resp) {

        if (resp) {

                const username = req.body.email
                const user = {
                    name: username
                }

                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, "dhava")
                
                        res.json({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            signedIn: "Signed In"
                    
            })
          }
     else {
            res.json({status:"Wrong Password!"});
        }
    });

})

.catch(err =>   res.json(err))


function generateAccessToken(user) {
return jwt.sign(user, "dhava")
}


})








































app.get('/post/:postId', authenticateToken,async (req, res) => {
  const {
    postId
  } = req.params
  const post = await prisma.post({
    id: postId
  })
  res.json(post)
})

app.get('/orders',authenticateToken, async (req, res) => {
  const fragment = `
fragment UserWithOrder on User {
  name
  email
  products{
    productid
  }
}
`
  const userWithPosts = await prisma.users().$fragment(fragment)

  const user = await prisma.user({
    email: "thavasiva1999@gmail.com"
  })
  const postsByUser = await prisma.user({
    email: 'thavasiva1999@gmail.com'
  }).products()
  //   const { userId } = req.params

  const order = await prisma.orders({
    where: {
      id: 2
    }
  })
  res.status(200).send(userWithPosts)
})

app.post('/user', authenticateToken,async (req, res) => {
  const newUser = await prisma.createUser(req.body)
  res.json(newUser)
})

app.post('/post/draft', async (req, res) => {
  const newPost = await prisma.createPost(req.body)
  res.json(newPost)
})

app.put(`/post/publish/:postId`,authenticateToken, async (req, res) => {
  const {
    postId
  } = req.params
  const updatedPost = await prisma.updatePost({
    where: {
      id: postId
    },
    data: {
      published: true
    },
  })
  res.json(updatedPost)
})


function authenticateToken(req, res, next) {
  const authHeader = JSON.parse(req.headers.authorization)
  // console.log(req.headers.authorization)

  if (authHeader !== undefined) {
    const token = JSON.parse(req.headers.authorization)
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, "dhava", (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
}


app.listen(9000, () =>
  console.log('Server is running on http://localhost:9000'),
)