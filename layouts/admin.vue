<template>
    <b-container fluid class="layout-admin">
        <b-row class="justify-content-end">
            <b-col cols="lg-2" class="side-bar">
                <CompSidebar/>
            </b-col>
            <b-col cols="lg-10" class="p-0">
                <div class="px-3">
                    <CompHeaderAdmin/>
                </div>
                <div class="wrap-container py-5 px-5">
                    <Nuxt/>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    transition: 'fade',
}
</script>

<style lang="scss">

.layout-admin{
    .side-bar{
        position: fixed;
        background-color: #ffffff;
        height: 100%;
        left: 0;
        border-right: 1px solid #ccc;
        @media screen and ( max-width: 991px ){
            position: unset;
            order: 2;
        }
    }
    .wrap-container{
        background-color: #f7f7f8;
        min-height: calc( 100vh - 55px );
        @media screen and ( max-width: 991px ){
            min-height: auto;
            padding: 20px !important;
        }
        .content-admin{
            border: 1px solid #ccc;
            padding: 15px 20px;
            background-color: #fff;
            .image-preview{
                height: 200px;
                max-width: 100%;
            }
            #filterInput{
                border-right: none;
                border-color:#ccc;
                border-radius: 0;
                &:focus{
                    box-shadow: none;
                }
            }
            .input-group-append{
                margin-left: 0;
            }
            .main-table{
                #table-customers{
                    tr{
                        th{
                            &.actions-col{
                                width: 90px;
                            }
                        }
                    }
                }
                tr{
                    outline: none;
                    &.b-table-row-selected.table-active{
                        background-color: #fff;
                    }
                    th{
                        border: 1px solid #ccc;
                        padding: 10px 20px;
                        vertical-align: unset;
                        &:first-child{                      
                        }
                        &.actions-col{
                            width: 119px;
                        }
                        &.image-col{
                            width: 95px;
                        }
                        &.create-at-col{
                            width: 123px;
                        }
                        &.id-col{
                            width: 116px;
                        }
                    }
                    td{
                        vertical-align: unset;
                        padding: 10px 20px;
                        border: 1px solid #ccc;
                        .row-actions{
                            display: flex;
                        }
                        .image-product-table{
                            width: 50px;
                            height: 50px;
                            object-fit: cover;
                        }
                        .card{
                            border: none;
                            .card-body{
                                padding: 0;
                                ul{
                                    margin: 0;
                                    padding: 0 10px;
                                    list-style: none;
                                }
                            }
                        }
                    }
                }
            }
            .pagination-table{
                #perPageSelect{
                    box-shadow: none;
                    &:focus{
                        border-color: #ccc;
                    }
                }
                .page-item.active{
                    .page-link{
                        background-color:#00c58e;
                        border-color: #00c58e;
                        color: #fff;
                    }
                } 
                .page-link{
                    color:#00c58e;
                    &:focus{
                        box-shadow: none;
                    }
                }
            }
        }
    }
}
.required-feedback{
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545
}
input:focus,
select:focus{
    box-shadow: none;
    border-color: #ccc;
}
select{
    box-shadow: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

::-webkit-search-cancel-button { 
    -webkit-appearance: none; 
}

::-webkit-search-results-button {
     -webkit-appearance: none; 
}

input[type=search] { 
    -webkit-appearance: none; 
}

.fade-enter-active,
.fade-leave-active{
    transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active{
    opacity: 1;
}
a{
    text-decoration: none !important;
    color: #5a6268;
}
a:hover{
    color: #00c58e;
}
html {
    font-family:
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    font-size: 16px;
    color: #5a6268;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
body{
    color: #5a6268;
    font-size: 14px;
}
.form-control{
    font-size: 14px;
}
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track {
    background: #fff; 
}

::-webkit-scrollbar-thumb {
    background: #00c58e ; 
}

::-webkit-scrollbar-thumb:hover {
    background: #5a6268; 
}
.btn{
    box-shadow: none;
}
.btn-primary{
    color: #fff;
    background-color: #00c58e;
    border-color: #00c58e;
}
.btn-primary:focus{
    background-color: #00c58e;
    border-color: #00c58e;
    box-shadow: none;
}
.btn-primary:hover{
    background-color: #5a6268;
    border-color: #5a6268;
}
.btn-remove{
    color: #fff;
    // background-color: #f44336c9;
    // border-color: #f44336c9;
}
.btn-remove:focus{
    // background-color: #f44336c9;
    // border-color: #f44336c9;
    box-shadow: none;
}
img{
    max-width: 100%;
}
.text-overflow{
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

    .button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
