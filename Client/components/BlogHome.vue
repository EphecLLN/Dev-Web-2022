<template>
  <section class="blog-one blog-one__home" id="blog">
    <img src="/assets/images/shapes/blog-shape-1-1.png" alt="" class="blog-one__shape-1">
    <div class="container">
      <div class="block-title text-center">
        <span class="block-title__bubbles"></span>
        <p>Checkout Latest Posts</p>
        <h3>News & Articles</h3>
      </div><!-- /.block-title -->
      <div class="row">
        <div class="col-lg-4 wow fadeInLeft" data-wow-duration="1500ms">
          <div class="blog-one__single">
            <div class="blog-one__image">
              <img src="/assets/images/blog/blog-1-1.jpg" alt="">
            </div><!-- /.blog-one__image -->
            <div class="blog-one__content">
              <ul class="blog-one__meta list-unstyled">
                <li><a href="#"><i class="far fa-clock"></i> 20 Feb</a></li>
                <li><a href="#"><i class="far fa-comments"></i> 2 Comments</a></li>
              </ul><!-- /.blog-one__meta list-unstyled -->
              <h3><nuxt-link to="/blog-details">Pre and post launch mobile app marketing pitfalls to avoid</nuxt-link>
              </h3>
              <nuxt-link to="/blog-details" class="blog-one__link"><i class="zimed-icon-right-arrow"></i></nuxt-link>
              <!-- /.blog-one__link -->
            </div><!-- /.blog-one__content -->
          </div><!-- /.blog-one__single -->
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4 wow fadeInUp" data-wow-duration="1500ms">
          <div class="blog-one__single">
            <div class="blog-one__image">
              <img src="/assets/images/blog/blog-1-2.jpg" alt="">
            </div><!-- /.blog-one__image -->
            <div class="blog-one__content">
              <ul class="blog-one__meta list-unstyled">
                <li><a href="#"><i class="far fa-clock"></i> 20 Feb</a></li>
                <li><a href="#"><i class="far fa-comments"></i> 2 Comments</a></li>
              </ul><!-- /.blog-one__meta list-unstyled -->
              <h3><nuxt-link to="/blog-details">It is all exactly as i said, but i don't like it let's unpack
                that</nuxt-link></h3>
              <a href="blog-details.html" class="blog-one__link"><i class="zimed-icon-right-arrow"></i></a>
              <!-- /.blog-one__link -->
            </div><!-- /.blog-one__content -->
          </div><!-- /.blog-one__single -->
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4 wow fadeInRight" data-wow-duration="1500ms">
          <div class="blog-one__single">
            <div class="blog-one__image">
              <img src="/assets/images/blog/blog-1-3.jpg" alt="">
            </div><!-- /.blog-one__image -->
            <div class="blog-one__content">
              <ul class="blog-one__meta list-unstyled">
                <li><a href="#"><i class="far fa-clock"></i> 20 Feb</a></li>
                <li><a href="#"><i class="far fa-comments"></i> 2 Comments</a></li>
              </ul><!-- /.blog-one__meta list-unstyled -->
              <h3><nuxt-link to="/blog-details">I just wanted to give you a heads-up, or this you feel you
                would</nuxt-link></h3>
              <a href="blog-details.html" class="blog-one__link"><i class="zimed-icon-right-arrow"></i></a>
              <!-- /.blog-one__link -->
            </div><!-- /.blog-one__content -->
          </div><!-- /.blog-one__single -->
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->
    </div><!-- /.container -->
  </section>
</template>

<script>
    export default {
        name: "BlogHome"
    }
</script>

<style scoped>

</style>
