<template>
    <div class="footer">
        <div class="footer-social">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <h6>Social</h6>
                        <div class="social text-left">
                            <div class="listSocial">
                                <a><img src="~/assets/images/facebook.png" /></a>
                                <a><img src="~/assets/images/instagram.png" /></a>
                                <a><img src="~/assets/images/youtube.png" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h6 class="mb-0">Always updated</h6>
                        <p class="mb-2">About information and new products</p>
                        <CompMailchimpSignup/>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-left">
                        ©2020 Cong CaPhe.Ltd All rights reserved
                    </div>
                </div>
            </div>
        </div>
        <CompCompare/>
        <go-top
            :bg-color="'#3c5e2c'"
            :radius="'0%'"
            :size="60"
            :right="25"
            :has-outline="false"
        ></go-top>
    </div>
</template>

<script>

const GoTop = process.client ? require('@inotom/vue-go-top').default : null;

export default {
    data() {
        return {
            
        }
    },
    methods: {
    },
    components: {
        GoTop
    }
}
</script>

<style lang="scss">

.footer{
    margin-top: 50px;
    .footer-social{
        border-top: 1px solid #3c5e2c;
        padding: 20px 0;
        h6{
            font-size: 20px;
            color: #3c5e2c;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .social{
            .listSocial{
                display: flex;
                a{
                    padding: 0 10px;
                    &:first-child{
                        padding-left: 0;
                    }
                    &:last-child{
                        padding-right: 0;
                    }
                    img{
                        height: 24px;
                    }
                }
            }
        }
    }
    .copyright{
        font-size: 14px;
        border-top: 1px solid #232323;
        padding-top: 25px;
        padding-bottom: 20px;
        background: #3c5e2c;
        color: #fff;
    }
}

</style>