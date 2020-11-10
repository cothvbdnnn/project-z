<template>
    <div>
        <CompHeader/>
        <div class="wrapper">
            <Nuxt/>
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
    margin: 50px 0;
    @media screen and ( max-width: 1024px ){
        margin-top: 100px;
    }
}

</style>
