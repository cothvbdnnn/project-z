<template>
    <div class="newsletter">
        <mailchimp-subscribe
            url="https://gmail.us5.list-manage.com/subscribe/post-json"
            user-id="e0cc31762ef8779eb3a8e546c"
            list-id="bbaf74581c"
            @error="onError"
            @success="onSuccess"
        >
            <template v-slot="{ subscribe, setEmail, error, success, loading }">
            <form @submit.prevent="subscribe">
                <div class="input-group">
                    <input type="email" @input="setEmail($event.target.value)" placeholder="Your email" />
                    <button class="btn-primary" type="submit">Sign up</button>
                </div>
                <div v-if="error">
                    <span v-html="error">
                    </span>
                </div>
                <div v-if="success">Success</div>
                <div v-if="loading">Loading…</div>
            </form>
            </template>
        </mailchimp-subscribe>
    </div> 
</template>
 
<script>
import MailchimpSubscribe from 'vue-mailchimp-subscribe'
 
export default {
    data() {
        return {
        }
    },
    methods: {
        onError() {
        // handle error
        },
        onSuccess() {
        // handle success
        },
    },
    components: {
        MailchimpSubscribe,
    },
}
</script>
<style lang="scss">
.newsletter{
    @media screen and ( max-width: 575px ){
        margin-top: 10px;
    }
    .input-group {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -ms-flex-align: stretch;
        align-items: stretch;
        width: 100%;
        input {
            height: 35px;
            border-radius: 0;
            max-width: 250px;
            width: 100%;
            padding: 0 10px;
            border: 2px solid #3c5e2c;
            font-size: 14px;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        button {
            width: 100%;
            max-width: 100px;
            padding: 0 10px;
            border: none;
            color: #fff;
            text-transform: uppercase;
            height: 35px;
            margin-bottom: 0;
            line-height: 35px;
            font-size: 16px;
            border-radius: 0;
        }
    }
}
</style>