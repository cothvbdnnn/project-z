<template>
    <div class="newsletter">
        <h6>Always updated</h6>
        <p>About information and new products</p>
        <b-form
            id="add-subscribe-form"
            ref="form"
            @submit.prevent="handleAddSubscriber"
        >
            <div class="input-group">
                <b-form-input type="email" class="form-control subscribe-email" placeholder="Email" required
                    v-model="email"
                    trim
                >
                </b-form-input>
                <span class="input-group-btn">
                    <b-btn class="btn-primary" name="subscribe" type="submit" form="add-subscribe-form"
                        @keyup.enter="handleAddSubscriber"
                    >Sign up</b-btn>
                </span>
            </div>
        </b-form>
        <div>
            <b-alert show variant="danger" class="mt-3 py-1 px-3"
                v-if="fail == true"
            >You are already subscribed to our newsletter</b-alert>
            <b-alert show variant="primary" class="mt-3 py-1 px-3"
                v-if="success == true"
            >Success</b-alert>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            email: '',
            success: false,
            fail: false,
        }
    },
    watch: {
        success(){
            setTimeout(() => {
                this.success = false
            }, 2000);
        },
        fail(){
            setTimeout(() => {
                this.fail = false
            }, 2000);
        }
    },
    computed: {
        ...mapState({
            getSubscribers: state => state.Subscriber.subscribers,
        }),
    },
    methods: {
        ...mapActions({
            'actAddSubscriber' : 'Subscriber/actAddSubscriber',
        }),
        handleAddSubscriber(){
            
            let findSubs = this.getSubscribers.map(x => {
                return x.email.toLowerCase()
            })
            console.log(findSubs);
            // Check subscriber has esixt

            if(this.email != ""){
                if (!findSubs.includes(this.email.toLowerCase())) {
                    this.actAddSubscriber(this.email)
                    this.$refs.form.reset()
                    this.success = true
                }else{
                    this.fail = true
                }
            }
        }
    },
}
</script>

<style lang="scss">
.newsletter{
    @media screen and ( max-width: 575px ){
        margin-top: 10px;
    }
    p{
        margin-top: -9px;
        color: #232323;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .input-group {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: stretch;
        align-items: stretch;
        width: 100%;
        input {
            height: 35px;
            border-radius: 0;
            max-width: 250px;
            border-color: #3c5e2c;
            font-size: 14px;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        span {
            color: #b4b9bc;
            font-size: 13px;
            button {
                padding: 0 0px;
                border: none;
                color: #fff;
                text-transform: uppercase;
                width: 100px;
                height: 35px;
                margin-bottom: 0;
                line-height: 35px;
                font-size: 16px;
                border-radius: 0;
            }
        }
    }
}
</style>