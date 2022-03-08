
const app =new Vue({
    el:'#app',
    data:{
        title:'hello'
    },
    methods:{
        getJson(url){
            return fetch (url)
            .then(result=>result.json())
            .catch(error=>{
                this.$refs.error.setError(error)
            })
        },
        postJson(url,data){
            return fetch(url,{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error =>{
                  this.$refs.error.setError(error)
              })
        },
        putJson(url,data){
            return fetch(url,{
                method: 'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error =>{
                //   this.$refs.error.setError(error)
                  console.log(error)
              })
        },
        deleteJson(url,data){
            return fetch(url,{
                method: 'DELETE',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error =>{
                //   this.$refs.error.setError(error);
                  console.log(error)
              })
        },
        addProduct(product){
            var clicked = product.id;
            var ids = this.products.map(el=> el.id);
            var clickedProductIndex = ids.indexOf(clicked);
            var clickedItem = this.products[clickedProductIndex]
            var idInBasket = this.cartItem.map(el=> el.id); // кликнутый элемент найденный в массиве товаров
            if(idInBasket.includes(clicked)){
                clickedItem.count++
                // this.$root.postJson(`/api/cart`,this.cartItem)
                console.log('увеличили')
                console.log(this.cartItem)
                this.$root.putJson(`/api/cart/:${idInBasket}`,this.cartItem)

            }else{
                clickedItem.count=1
                this.cartItem.push(clickedItem);   // добавляем кликнутый элемент в  массив корзины 
                console.log('добавили')
                console.log(this.cartItem)
                // this.$root.postJson(`/api/cart`,this.cartItem)
                this.$root.postJson(`/api/cart`,this.cartItem)

            }
            console.log(cartItem)

        }
    },
 
    template:`
        <div>
        <site-header/>
        <catalog/>
        </div>
    `

});