<template>
<div>
    <PageHeader title="Nos produits" />
    <addArticle />
  </div>
</template>

<script>
import axios from 'axios'

  import Blog from "~/components/Blog.vue";
  import PageHeader from "~/components/PageHeader.vue";
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";
  import addArticle from "~/components/addArticle.vue";
export default {

  components: {
addArticle,
Header,
Footer,
PageHeader,
      Blog
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  
methods: {
 
},

}
</script>

<style>

</style>
