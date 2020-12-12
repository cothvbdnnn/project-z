<template>
    <div class="share-social">
        <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{backgroundColor: network.color}"
            :url="sharing.url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
        >
            <span>{{ network.name }}</span>
        </ShareNetwork>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://project-z-nuxt.herokuapp.com' + this.$route.fullPath,
        title: '',
        description: '',
        quote: '',
        hashtags: 'thanhcoffee',
      },
      networks: [
        { network: 'email', name: 'Email', icon: 'fa-envelope', color: '#fff' },
        { network: 'facebook', name: 'Facebook', icon: 'fa-facebook-f', color: '#fff' },
        { network: 'pinterest', name: 'Pinterest', icon: 'fa-pinterest', color: '#fff' },
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#fff' },
      ]
    }
  }
}
</script>
