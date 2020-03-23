const { prisma } = require('../generated/prisma-client/index')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')

app.use(bodyParser.json())
app.use(cors())

app.post(`/showitems`, async (req, res) => {
  const publishedPosts = await prisma.products()
  res.json(publishedPosts)
})

app.post(`/viewproduct`, async (req, res) => {
    const publishedPosts = await prisma.product({productid:req.body.productid})
    res.json(publishedPosts)
  })

app.post(`/userdefault1`, async (req, res) => {
  let fav=0,item=0
    const publishedPosts = await prisma.favorites({where:{email:req.body.email,productid:req.body.productid}})
    if(publishedPosts[0]!==undefined){
      fav=1
    }
    const publishedPosts1= await prisma.carts({where:{email:req.body.email,productid:req.body.productid}})
    if(publishedPosts1[0]!==undefined){
      item=1
    }

    if (fav == 1 && (item == 0) )
                res.send("fav")
            else if ((fav == 0) && item == 1) 
                res.send("item")
            else if (fav == 1 && item == 1) 
                res.send("favitem")
            else 
                res.send("null")
  })

  app.post(`/addfav1`, async (req, res) => {
    const query=`
    mutation {
      createFavorite(
        data: {
          email: "`+req.body.email+`"
          productid: "`+req.body.productid+`"
          productdetail: { connect: { productid: "`+req.body.productid+`" } }
        }
      ) {
        email
        productid
      }
    }`
  await prisma.$graphql(query)
    .then(data=>res.send("Favorite Added"))
    .catch(err=>res.send(err))
  })

  app.post(`/delfav1`, async (req, res) => {
    await prisma.deleteManyFavorites({
  
      email:req.body.email,
      productid:req.body.productid
    
  })
    .then(data=>res.send("Favorite Deleted"))
    .catch(err=>res.send(err))
  })


  app.post(`/additems1`, async (req, res) => {
    const query=`
    mutation{
      createCart(data:{
        email:"thavasiva1999@gmail.com",
        productid:"`+req.body.productid+`"
        productdetail:{
          connect:{
            productid:"`+req.body.productid+`"
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
      .then(data=>res.send("Item Added"))
      .catch(err=>res.send(err))
    })
  
    app.post(`/delitems1`, async (req, res) => {
      await prisma.deleteManyCarts({
    
        email:req.body.email,
        productid:req.body.productid
      
    })
      .then(data=>res.send("Item Removed"))
      .catch(err=>res.send(err))
    })

    app.post(`/getcart1`, async (req, res) => {
      const query=`
      query{
        carts(where:{email:"`+req.body.email+`"}){
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

    app.post(`/getwish1`, async (req, res) => {
      const query=`
      {
        favorites(
          where:{
            email:"`+req.body.email+`"  
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

    app.post(`/getorderviews`, async (req, res) => {
      const query=`
      {
        cartsConnection(where: { email: "`+req.body.email+`" }) {
          aggregate {
            count
          }
        }
      }`
      const publishedPosts = await prisma.$graphql(query)

      res.json(publishedPosts.cartsConnection.aggregate.count)

    
    })

    app.post(`/adminstatus`, async (req, res) => {
      const query=`
      {
        user(where:{email:"`+req.body.email+`"})
        {
          isadmin
        }
      }`
      const publishedPosts = await prisma.$graphql(query).catch(err=>console.log(err))
if(publishedPosts.user)
      res.json(publishedPosts.user.isadmin)
else res.json("")
    
    })

    app.post(`/getuser`, async (req, res) => {
      const query=`
      {
        user(where:{email:"`+req.body.email+`"})
        {
          name
          email
          isadmin
        }
      }`
      const publishedPosts = await prisma.$graphql(query)

      res.json(publishedPosts.user)

    
    })

    app.post(`/checkaddress`, async (req, res) => {
      var resp="invalid"
    if(req.body.firstname!==null||undefined){
        if(req.body.lastname!==null||undefined){
            if(req.body.country!==null||undefined){
                if(req.body.zip!==null||undefined){
                    if(req.body.address1!==null||undefined){
                        resp="valid"
                        const query=`
                        mutation{
                          updateUser(where:{
                            email:"`+req.body.email+`"
                          },
                          data:{
                            address:"`+body+`"
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


    app.post(`/adminstatus`, async (req, res) => {
      const query=`
      {
        user(where:{email:"`+req.body.email+`"})
        {
          isadmin
        }
      }`
      const publishedPosts = await prisma.$graphql(query)
  if(publishedPosts.user.isadmin)
      res.send("true")
  else res.send("false")    
    })

    app.post(`/addorders`, async (req, res) => {
      const transid=Math.random()
      const query=`
      {
        carts(where:{
          email:"`+req.body.email+`"
        }){
          productid
        }
      }`
      const carts = await prisma.$graphql(query)
      carts.carts.map(async(cart)=>{
        const query=`
        mutation{
          createOrder(data:{
            email:"`+req.body.email+`",
            productid:"`+cart.productid+`",
            rating:"false",
            remind:"false",
            return:"false",
            transid:"`+transid+`",
            owner:{
              connect:{
                email:"`+req.body.email+`"
              }
            },
            productdetail:{
              connect:{
                productid:"`+cart.productid+`"
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
    carts.carts.map(async(cart)=>{
      const query=`
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

    app.post(`/searchproducts`, async (req, res) => {
      const query=`
      {
        products(where:{
          name_contains:"`+req.body.key+`"
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

    app.post(`/getmyorder`, async (req, res) => {
      const query=`
      {
        orders(
          where:{
            email:"`+req.body.email+`"  
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
    


    app.post(`/getordertransid`, async (req, res) => {
      const query=`
      {
        orders(
          where:{
            email:"`+req.body.email+`"  
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










































app.get('/post/:postId', async (req, res) => {
  const { postId } = req.params
  const post = await prisma.post({ id: postId })
  res.json(post)
})

app.get('/orders', async (req, res) => {
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

    const user=await prisma.user({email:"thavasiva1999@gmail.com"})
    const postsByUser = await prisma.user({ email: 'thavasiva1999@gmail.com' }).products()
//   const { userId } = req.params

  const order = await prisma.orders({where:{id:2}})
  res.status(200).send(userWithPosts)
})

app.post('/user', async (req, res) => {
  const newUser = await prisma.createUser(req.body)
  res.json(newUser)
})

app.post('/post/draft', async (req, res) => {
  const newPost = await prisma.createPost(req.body)
  res.json(newPost)
})

app.put(`/post/publish/:postId`, async (req, res) => {
  const { postId } = req.params
  const updatedPost = await prisma.updatePost({
    where: { id: postId },
    data: { published: true },
  })
  res.json(updatedPost)
})

app.listen(9000, () =>
  console.log('Server is running on http://localhost:9000'),
)

  