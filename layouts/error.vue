<template>
    <div>
        <b-container>
            <b-row>
                <b-col cols="lg-5" class="mt-5 mx-auto text-center">
                    <Logo/>
                    <h1 class="mt-2" v-if="error.statusCode === 404">404 Error</h1>
                    <h1 v-else>An error occurred</h1>
                    <p>{{ error.message }}</p>
                    <NuxtLink to="/">
                        <b-button class="btn-primary mx-2">Home Page</b-button>
                    </NuxtLink>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
}
</script>

<style>

</style>