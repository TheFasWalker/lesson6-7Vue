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
            let find = this.cartItem.find(el => el.id === product.id );
            if(find){
                this.$root.putJson(`api/cart/${find.id}`,{count:1});

                find.count++;
            }else{
                let prod = Object.assign({count:1},product)
                this.$root.postJson('/api/cart',prod)
                    .then(data =>{
                        if(data.result ===1){
                            this.cartItem.push(prod)
                        }
                    })
            }
        }
    },
    computed:{},
    mounted(){},
    created(){
        this.getJson(this.catalogUrl)
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

