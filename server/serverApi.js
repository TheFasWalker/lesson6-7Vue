const fs = require('fs');
// const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/', express.static('./proj'))

app.get('/api/products', (req, res) => {
    console.log('запрос данных')
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.get('/api/cart', (req, res) => {
    console.log('запрос корзины')
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.post('/api/cart', (req, res) => {
    console.log('добавление в корзину')
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            cart.push(req.body);
            fs.writeFile('./server/db/basket.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 },null,2));
            });
        }
    });
});
app.put('/api/cart/:id', (req, res) => {
    console.log('увеличение количества')
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const itemId = req.params.id
            const cart = JSON.parse(data);
            var basketIds = cart.map(el=>el.id);
            var basketAdd = basketIds.indexOf(itemId)
            cart[basketAdd].count +=1
            fs.writeFile('./server/db/basket.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.delete('/api/cart/:id', (req, res)=>{
    console.log('Удаление товара')
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(err) res.send(JSON.stringify({result:0, err}));
        else{
            const itemId = req.params.id; //  достаём id элемента для удаления
            const cart = JSON.parse(data); // распарсили  корзину  для итерации
            const basketIds = cart.map(el=>el.id); // получаем массив id товаров в корзине
            const basketItem = basketIds.indexOf(itemId) // находим сам элемент в корзине
            if(cart[basketItem].count >= 2){             // проверяем количество
                cart[basketItem].count -=1              // если количество >=2 то уменьшаем количество на 1
            }else{
                 cart.splice(basketItem);
                console.log('пусто')

            }

            fs.writeFile('./server/db/basket.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    })
})


app.listen(5555, () => {
    console.log('Server started!');
});