<template>
    <div class="footer">
        <div class="footer-social">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <h6>Social</h6>
                        <div class="social text-left">
                            <div class="listSocial">
                                <a href="#"><img src="~/assets/images/facebook.png" /></a>
                                <a href="#"><img src="~/assets/images/instagram.png" /></a>
                                <a href="#"><img src="~/assets/images/youtube.png" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="contact-us">
                            <h6>Always updated</h6>
                            <p>About information and new products</p>
                            <form id="myFormSub">
                                <div class="input-group">
                                    <input type="email" class="form-control newsletter-email" name="email" id="email" size="13" placeholder="Email" required="">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="submit" name="subscribe" id="mc-embedded-subscribe">Sign up</button>
                                    </span>
                                </div>
                            </form>
                            <div id="showMessageMe">
                            </div>
                            <span>We respect your privacy</span>
                        </div>
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
    </div>
</template>

<script>
export default {

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
        .contact-us{
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
                    font-size: 13px;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                }
                span {
                    color: #b4b9bc;
                    font-size: 13px;
                    button {
                        padding: 0 0px;
                        background-color: #3c5e2c;
                        border: none;
                        color: #fff;
                        text-transform: uppercase;
                        width: 100px;
                        margin-bottom: 0;
                        line-height: 35px;
                        font-size: 16px;
                        border-radius: 0;
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