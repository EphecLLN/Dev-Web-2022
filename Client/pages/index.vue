<template>
  <div>
    <Banner />
    <Contact />
    <CallToAction />
  </div>
</template>

<script>
  import Banner from "~/components/Banner.vue";
  import Contact from "~/components/Contact.vue";
  import CallToAction from "~/components/CallToAction.vue";

export default {
  components: {
    Banner,
    Contact,
    CallToAction

  }
}
</script>

<style>

</style>
