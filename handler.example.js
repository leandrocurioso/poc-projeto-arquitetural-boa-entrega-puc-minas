handler({ 
    Records: [
      {
      body: `{
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRBY2Nlc3NLZXkiOiIwYTQ3MmJkOC02NzhlLTQ4OTEtYmZjZS0yMzk5YjY0ZGQxOTUifQ.r1ukHrnarkOeDY31xihzYggYTPPJ50tM0TwL50POdzU",
          "thirdPartyOrderId": "001",
          "clientAccessKey": "32158340-a2c3-56e9-a09a-d982cf881317",
          "products": [
              {
                  "name": "Caixa de lápis Faber Castell",
                  "quantity": 1, 
                  "unitValue": 20.25,
                  "barcode": "7891233245663",
                  "weight": 100,
                  "width": 8,
                  "height": 15,
                  "depth": 3
              },
              {
                  "name": "Panela de Inox Mondial",
                  "quantity": 2,
                  "unitValue": 50.99,
                  "barcode": "7891233245632",
                  "weight": 2,
                  "width": 40,
                  "height": 10,
                  "depth": 15
              }
          ],
          "client": {
              "name": "Carlos Alberto",
              "documentId": "47869681123",
              "email": "carlos@gmail.com",
              "telephone": "65999877436",
              "documentType": "CPF",
              "address": {
                  "street": "Rua do Arraial",
                  "zipcode": "04122030",
                  "number": "209",
                  "district": "Vila Mariana",
                  "city": "São Paulo",
                  "state": "SP",
                  "country": "BRASIL"
              }
          }
      }`
    }
    ]
  })