<template>
    <div class="main">
        <div class="container">
            <div class="content-responsive">
                <div class="section">
                    <div class="row">
                        <div class="col-sm-6 col-banner-1">
                            <div class="banner">
                                <a href="#">
                                    <img src="~/assets/images/banner1.jpg"> 
                                    <span class="txt style1 lineHeight wow fadeIn" data-wow-delay="0.3s">How To</span> 
                                </a>
                            </div>
                        </div>
                        <div class="col-sm-6 col-banner-2">
                            <div class="banner">
                                <a href="#">
                                    <img src="~/assets/images/banner2.jpg"> 
                                    <span class="txt style1 lineHeight wow fadeIn" data-wow-delay="0.3s">MENU</span> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="banner txt-center style2">
                                <a href="#">
                                    <img src="~/assets/images/Pha-Che.jpg">
                                </a>
                                <div class="txtLeft ">
                                    <div class="lineHeight">
                                        <h6 class="wow slideInLeft" data-wow-delay="0.3s" data-wow-duration="1s"><a href="#">NEWS</a></h6>
                                        <p class="wow slideInRight" data-wow-delay="0.3s" data-wow-duration="1s">"Work hard, then comes love".</p>
                                        <p class="wow slideInRight" data-wow-delay="0.3s" data-wow-duration="1s">Have a nice day!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="banner txt-center">
                                <a href="#">
                                    <img src="~/assets/images/tuyen-Dung-2.jpg">
                                </a>
                                <div class="txtCenter ">
                                    <div class="lineHeight">
                                        <h6 class="wow slideInRight" data-wow-delay="0.3s" data-wow-duration="1s"><a href="#">CAREER</a></h6>
                                        <p class="wow slideInLeft" data-wow-delay="0.3s" data-wow-duration="1s">Become a part of Cong Family. Join us.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    head: {
        title: "Project Z"
    },
    transition: 'fade',
}
</script>

<style lang="scss">

.main{
    
    .section {
        margin-bottom: 30px;
    }
    .col-banner-1{
        @media screen and ( max-width: 575px ){
            margin-bottom: 30px;
        }
    }
    .banner {
        @media screen and ( max-width: 575px ){
            height: 200px;
        }
        position: relative;
        overflow: hidden;
        min-height: 55px;
        max-height: 400px;
        height: 100%;
        cursor: pointer;
        line-height: 0;
        &.txt-center{
            .txtLeft{
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                position: absolute;
                left: 0;
                width: calc(50% - 15px);
                top: 0;
                height: 100%;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                background: rgba(255, 241, 208, 0.9);
                padding: 0 15px;
                -webkit-transition: all 0.7s ease;
                -o-transition: all 0.7s ease;
                transition: all 0.7s ease;
                text-align: center;
            }
            .txtCenter {
                @media screen and ( max-width: 575px ){
                    min-width: 70%;
                }
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                background: rgba(255, 241, 208, 0.9);
                position: absolute;
                left: 50%;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                min-width: 50%;
                padding: 23px 15px;
                -webkit-transition: all 0.25s ease;
                -o-transition: all 0.25s ease;
                transition: all 0.25s ease;
                text-align: center;
                &:hover{
                    -webkit-transform: translate(-50%, calc(-50% - 4px));
                    -ms-transform: translate(-50%, calc(-50% - 4px));
                    transform: translate(-50%, calc(-50% - 4px));
                }
            }
        }
        &.style2:hover{
            .txtLeft{
                left: calc(100% - 50% + 15px);
                right: 0;
            }
        }
        a{
            height: 100%;
            width: 100%;
            display: inline-block;
            line-height: 0;
            color: inherit;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        h6{
            font-size: 30px;
            color: #555555;
            font-weight: 600;
            text-transform: uppercase;
            position: relative;
            margin-bottom: 20px;
            &:after{
                content: '';
                position: absolute;
                left: 50%;
                bottom: -5px;
                width: 70px;
                height: 4px;
                background: #555555;
                -webkit-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                transform: translateX(-50%);
            }
        }
        p{
            font-weight: 300;
            font-size: 16px;
            line-height: 1;
            margin-bottom: 0;
        }
        span.txt.style1 {
            padding: 15px 0;
            min-width: 60%;
            background: rgba(255, 241, 208, 0.9);
            -webkit-transition: all 0.25s ease;
            -o-transition: all 0.25s ease;
            transition: all 0.25s ease;
            &:hover {
                -webkit-transform: translate(-50%, calc(-50% - 4px));
                -ms-transform: translate(-50%, calc(-50% - 4px));
                transform: translate(-50%, calc(-50% - 4px));
            }
        }
        span.txt {
            line-height: 1;
            display: inline-block;
            text-transform: uppercase;
            color: #555555;
            font-size: 30px;
            text-align: center;
            font-weight: 600;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 9;
        }
        
    }
}

</style>
