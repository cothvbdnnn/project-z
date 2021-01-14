<template>
    <div>
        <CompHeader/>
        <div class="wrapper">
            <div class="main">
                <CompBreadcrumb/>
                <Nuxt/>
            </div>
        </div>
        <CompFooter/>
    </div>
</template>

<script>
export default {
    transition: 'fade',
}
</script>

<style lang="scss">

.wrapper{
    & > div{
        @media screen and ( max-width: 1024px ){
            margin-top: 100px;
        }
    }
}

</style>
