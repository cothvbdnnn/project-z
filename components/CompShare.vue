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
            <img :src="require(`~/assets/images/${network.icon}`)" />
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
        { network: 'email', name: 'Email', icon: 'g.png', color: '#fff' },
        { network: 'facebook', name: 'Facebook', icon: 'facebook.png', color: '#fff' },
        { network: 'pinterest', name: 'Pinterest', icon: 'p.png', color: '#fff' },
        { network: 'twitter', name: 'Twitter', icon: 't.png', color: '#fff' },
      ]
    }
  }
}
</script>
