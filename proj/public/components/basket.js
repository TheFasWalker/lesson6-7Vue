Vue.component('basket',{
    props:{
        'basketVisibility':Boolean,
    },
    data(){
        return{
            cartUrl:'/api/cart',
            cartItems:[],
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
    },
    computed:{},
    mounted(){},
    created(){
        this.getJson(this.cartUrl)
            .then(data =>{
                for(let el of data){
                    this.cartItems.push(el)
                }
            })
    },
    template:`
        <div class="header__basket" :class="{hiddenBlock : basketVisibility}">
            <div class="header__basker-container">
                <p v-if="cartItems.length < 1">Корзина пуста</p>
                <div 
                    class="catr-item" 
                    v-for="item of cartItems" 
                    :keys="item.id"
                    >
                    <div class="card-item-info">
                        <p class="product__title">{{item.name}}</p>
                        <p class="product__price">{{item.price}}</p>
                    </div>
                    <button class="card-item-del" :data-id="item.id">del</button>
                </div>
            </div>
        </div>
    `
});
