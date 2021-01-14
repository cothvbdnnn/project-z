<template>
    <div class="container mx-auto" v-if="this.$route.path != '/'">
        <b-breadcrumb>
            <b-breadcrumb-item><nuxt-link to="/">Home</nuxt-link></b-breadcrumb-item>
            <b-breadcrumb-item
                v-for="(item, i) in items.slice(0, -1)" :key="i"   
            ><nuxt-link :to="item.url">{{ item.text }}</nuxt-link>
            </b-breadcrumb-item>
            <b-breadcrumb-item active >
                {{ items.slice(-1).pop().text }}
            </b-breadcrumb-item>
        </b-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        path(){
            return this.$route.fullPath.split('/').slice(1)
        },
        items(){
            return this.path.map( (x,i,array) => {
                if(i == 0){
                    return {
                        text: x.split('?')[0].replace(/-/g,' '),
                        url: '/' + x,
                    }
                }else{
                    return {
                        text: x.split('?')[0].replace(/-/g,' '),
                        url: this.$route.fullPath.split(x)[0] + x,
                    }
                }
                
            })
        }
    }
}
</script>

<style lang="scss">
    .breadcrumb{
        background: transparent;
        padding-left: 0;
        li{
            font-size: 18px;
            font-weight: 600;
            text-transform: capitalize;
            a{
                color: #3c5e2c;
            }
        }
    }
</style>