<template>
    <div class="main">
        <div class="slider">
            <div>
                <VueSlickCarousel v-bind="settings">
                    <div v-for="(slide,i) in getSlides" :key="i" class="container-slide">
                        <b-img :src="slide.image"></b-img>
                        <div class="txtSlide">
                            <div class="container">
                                <div class="text-center">
                                    <h6>{{ slide.title }}</h6>
                                    <div v-html="slide.description"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
        <div class="container">
            <div class="content-responsive">
                <div class="section">
                    <div class="row">
                        <div class="col-sm-6 col-banner-1">
                            <div class="banner">
                                <a href="#">
                                    <img src="~/assets/images/banner1.jpg"> 
                                    <span class="txt style1 lineHeight">VINTAGE</span> 
                                </a>
                            </div>
                        </div>
                        <div class="col-sm-6 col-banner-2">
                            <div class="banner">
                                <a href="/menu">
                                    <img src="~/assets/images/banner2.jpg"> 
                                    <span class="txt style1 lineHeight">MENU</span> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="banner txt-center style2">
                                <a href="/blog">
                                    <img src="~/assets/images/Pha-Che.jpg">
                                </a>
                                <div class="txtLeft ">
                                    <div class="lineHeight">
                                        <h6><a href="#">NEWS</a></h6>
                                        <p>"Work hard, then comes love".</p>
                                        <p>Have a nice day!</p>
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
                                        <h6><a href="#">CAREER</a></h6>
                                        <p>Become a part of Cong Family. Join us.</p>
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

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    head: {
        title: "Project Z"
    },
    transition: 'fade',
    data() {
        return {
            settings: {
                arrows: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }
    },
    computed: {
        ...mapState({
            getSlides: state => state.Slide.slides,
        }),
    },
    components: { 
        VueSlickCarousel,
    },
}
</script>

<style lang="scss">
body .main{
    @media screen and ( max-width: 1024px ){
        margin-top: 72px;
    }
    .slider{
        margin-bottom: 30px;
        .container-slide{
            position: relative;
            img{
                width: 100%;
                cursor: pointer;
                height: 500px;
                object-fit: cover;
                @media screen and ( max-width: 767px ){
                    height: 300px;
                }
            }
            .txtSlide {
                background: rgba(255, 241, 208, 0.9);
                padding: 30px 0;
                position: absolute;
                bottom: 0px;
                left: 0;
                width: 100%;
                z-index: 9;
                h6 {
                    font-size: 20px;
                    color: #555555;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    font-weight: 600;
                    @media screen and ( max-width: 767px ){
                        font-size: 14px;
                    }
                }
                p{
                    margin-bottom: 0;
                    @media screen and ( max-width: 767px ){
                        display: none;
                    }
                }
            }
        }
        
        .slick-arrow{
            top: 35%;
            background: url('~assets/images/arrow.png');
            text-indent: -999px;
            width: 50px;
            height: 50px;
            background-size: 100% 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            cursor: pointer;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            @media screen and ( max-width: 767px ){
                width: 25px;
                height: 25px;
            }
            &:before{
                display: none;
            }
            &.slick-next{
                @media screen and ( max-width: 767px ){
                    right: 15px;
                }
                right: 30px;
                z-index: 1;
                -webkit-transform: translateY(-50%) rotate(180deg);
                -ms-transform: translateY(-50%) rotate(180deg);
                transform: translateY(-50%) rotate(180deg);
            }
            &.slick-prev{
                @media screen and ( max-width: 767px ){
                    left: 15px;
                }
                left: 30px;
                z-index: 1;
            }
        }
    }
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
            @media screen and ( max-width: 767px ){
                font-size: 20px;
            }
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
            @media screen and ( max-width: 767px ){
                font-size: 20px;
            }
        }
        
    }
}

</style>
