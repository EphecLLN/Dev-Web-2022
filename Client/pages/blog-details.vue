<template>
  <div>
    <PageHeader title="Blog Details" />
    <BlogDetails />
  </div>
</template>
<script>
  import PageHeader from "~/components/PageHeader.vue";
  import BlogDetails from "~/components/BlogDetails.vue";
  export default {
    components: {
      BlogDetails,
      PageHeader
    },
    head(){
      return {
        title: "Zimed | Blog Details"
      }
    }
  }
</script>
