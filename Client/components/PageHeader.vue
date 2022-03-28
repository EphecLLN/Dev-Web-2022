<template>
  <section class="page-header" style="background-image: url(/assets/images/background/inner-banner-bg.png);">
    <div class="container">
      <h2>{{ title }}</h2>
    </div><!-- /.container -->
  </section>
</template>

<script>
    export default {
      name: "PageHeader",
      props: {
        title: {
          type: String
        }
      }
    }
</script>

<style scoped>

</style>
