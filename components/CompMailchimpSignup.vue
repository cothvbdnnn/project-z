<template>   
    <validation-observer
        ref="subscribe"
        tag="form"
        class="w-full max-w-lg"
        @submit.prevent="subscribe()"
    >
        <div class="flex items-start">
            <div class="w-2/3">
                <validation-provider
                    rules="required|email"
                    :bails="false"
                    tag="div"
                    name="Email"
                    v-slot="{ errors }"
                >
                    <input
                        v-model="form.email"
                        class="shadow bg-gray-300 appearance-none border-2 border-gray-300 w-full mb-2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-300"
                        id="grid-email"
                        type="email"
                        placeholder="Email"
                    />
                    <ul class="list-disc list-inside text-red-500 m-2" v-if="errors.length">
                        <li class="leading-none" v-for="(error,i) in errors" :key="i"><small>{{ error }}</small></li>
                    </ul>
                </validation-provider>
                <p class="text-gray-600 text-xs px-2">Don't worry, we don't like spam either!</p>
            </div>
            <div class="w-1/3 pl-2">
                <button
                    type="submit"
                    class="btn-primary rounded"
                >
                    <span class="mr-2">Subscribe</span>
                </button>
            </div>
        </div>
    </validation-observer>
</template>
<script>

import axios from 'axios'

export default {
    data(){
        return {
            form: {
                email: ''
            },
            response: {
                status: null,
                message: ''
            },
            cachedForm: {}
        }
    },
    methods: {
        async subscribe(event){
            const formData = {...this.form}
            try{
                const {data, status} = await axios.post('/api/subscribe', formData)
                this.response.status = status 
                this.response.message = `Thanks, ${data.email_address} is subscribed!`
                this.form = {...this.cachedForm}
                this.$refs.subscribe.reset()
            }catch(e){
                console.log(e)
            }
        }
    },
    mounted(){
        this.cachedForm = {...this.form}
    }
}
</script>