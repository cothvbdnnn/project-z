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
                        vertical-align: middle;
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
                        &.post-type-col{
                            text-transform: capitalize;
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
                        background-color:#3c5e2c;
                        border-color: #3c5e2c;
                        color: #fff;
                    }
                } 
                .page-link{
                    color:#3c5e2c;
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

</style>
