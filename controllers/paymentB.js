const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "3568x8qtr527sy9g",
  publicKey: "b22cf76d3hj3n9hc",
  privateKey: "335fa91de3ab90acbd8739d793b569a2"
});


exports.getToken = (req,res) =>{
    gateway.clientToken.generate({
        
      }, (err, response) => {
       if(err){
           res.status(500).send(err)
       }else{
           res.send(response)
       }
      });
}
exports.processPayment =(req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount:amountFromTheClient ,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(error)
          }else{
              res.json(result)
          }
      });
}