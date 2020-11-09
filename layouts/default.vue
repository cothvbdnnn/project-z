<template>
    <div>
        <CompHeader/>
        <div class="mt-5">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
export default {
    transition: 'fade',
}
</script>

<style lang="scss">

.quantity{
    input[type=number]{
        background-color: #fff;
        max-width: 50px;
        width: 100%;
        height: 30px;
        text-align: center;
    }
    .btn-primary{
        height: 30px;
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
        padding-left: 15px;
        width: 40px;
        padding-right: 15px;

    }
}
.btn.disabled, .btn:disabled{
    opacity: 1;
    cursor: default;
}

input:focus{
    outline: none;
    box-shadow: none !important;
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
}
h1{
    font-size: 32px;
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

.btn-primary{
    color: #fff;
    background-color: #00c58e;
    border-color: #00c58e;
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
