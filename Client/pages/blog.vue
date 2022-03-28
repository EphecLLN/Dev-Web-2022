<template>
  <div>
    <PageHeader title="Blog Page" />
    <Blog />
  </div>
</template>
<script>
  import Blog from "~/components/Blog.vue";
  import PageHeader from "~/components/PageHeader.vue";
  export default {
    components: {
      PageHeader,
      Blog
    },
    head(){
      return {
        title: "Zimed | Blog"
      }
    }
  }
</script>
