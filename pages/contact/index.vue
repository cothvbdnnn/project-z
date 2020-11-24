<template>
    <div class="recruitment recruitmentWrap recruitmentContact">
        <div class="pagetitle">
            <h2 class="title text-center">Contact Us</h2>
        </div>
        <div class="bannerCover">
        </div>
        <div class="contact-detail">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="info">
                            <h6>Email</h6>
                            <p>ngncthanh10@gmail.com</p>
                            <h6>Phone</h6>
                            <p><a href="tel:0832497856" style="color: inherit;">(+84) 83 2497856</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    head: {
        title: "Contact - Project Z"
    },
    transition: 'fade',
}
</script>

<style lang="scss">
    .recruitment {
        .pagetitle h2 {
            color: #3c5e2c;
            margin: 0px 0 30px;
            font-size: 24px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .bannerCover{
            background: url('~assets/images/contact.jpg') center center / cover no-repeat;
            position: relative;
            height: 500px;
            background-attachment: fixed;
        }
        .contact-detail{
            padding-top: 50px;
            h6 {
                text-transform: uppercase;
                font-size: 20px;
                color: #3c5e2c;
                font-weight: 600;
            }
            p{
                font-size: 20px;
            }
        }
    }

</style>