Vue.component('catalog',{
    data(){
        return{
            catalogUrl:'/api/products',
            products:[],
            cartItem:[]
        }
    },
    methods:{
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error =>{
                    console.log(error)
                })
        },
        addProduct(product){
            var clicked = product.id;
            var ids = this.products.map(el=> el.id);
            var clickedProductIndex = ids.indexOf(clicked);
            var clickedItem = this.products[clickedProductIndex]
            var idInBasket = this.cartItem.map(el=> el.id);
            if(idInBasket.includes(clicked)){
                clickedItem.count++
            }else{
                clickedItem.count=1
                this.cartItem.push(clickedItem);   // добавляем кликнутый элемент в  массив корзины 
            }

        }
    },
    computed:{},
    mounted(){},
    created(){
        this.getJson('/api/products')
            .then(data =>{
                for(let el of data){
                    this.products.push(el)
                }
            })
    },
    template:`
        <main>
        <span class="products__title">Каталог товаров</span>
            <div class="products">

                <div 
                    class="product-item"
                    v-for="product of products"
                    :key="product.id"
                >
                <img class="product-image" :src="product.image" alt="">
                        <div class="product__description">
                            <p>{{product.name}}</p>
                            <p>цена {{product.price}} руб</p>
                            <button 
                                class="product__buy" 
                                type="button" 
                                :data-id=product.id
                                @click="addProduct(product)"
                                >купить</button>
                        </div>
                </div>    
            </div>
        </main>
    `
})
Vue.component('site-header',{
    data(){
        return{
            basketCondition :true
        }
    },
    methods:{

    },
    
    computed:{},
    mounted(){},
    template:`
        <header>
            <div header__logo>
                <span>Интернет магазин</span>
            </div>
            <form action="#" class="search-form">
            <input 
                type="text" 
                class="search-field"
            >
            <button class="btn-search" type="submit" > поиск</button>
            </form>
            <button
                class="header__button"
                @click="basketCondition = !basketCondition"
             >Корзина</button>
            <basket v-bind:basketVisibility=basketCondition />
        </header>
    `
})

