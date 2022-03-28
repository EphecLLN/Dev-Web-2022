<template>
  <section class="contact-one" id="contact">
    <img src="/assets/images/shapes/contact-shape-1.png" alt="" class="contact-one__shape-1">
    <img src="/assets/images/shapes/contact-shape-2.png" alt="" class="contact-one__shape-2">
    <img src="/assets/images/shapes/contact-shape-3.png" alt="" class="contact-one__shape-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="contact-one__content">
            <div class="contact-one__images">
              <img src="/assets/images/resources/contact-1.jpg" class="wow fadeInUp" data-wow-duration="1500ms" alt="">
              <img src="/assets/images/resources/contact-2.jpg" class="wow fadeInUp" data-wow-duration="1500ms" alt="">
            </div><!-- /.contact-one__images -->
            <div class="contact-one__infos">
              <div class="contact-one__infos-single">
                <div class="contact-one__infos-icon">
                  <i class="zimed-icon-placeholder"></i>
                </div><!-- /.contact-one__infos-icon -->
                <div class="contact-one__infos-content">
                  <h3>Addresss</h3>
                  <p>20 Broklyn Street, New York. United States of <br> America </p>
                </div><!-- /.contact-one__infos-content -->
              </div><!-- /.contact-one__infos-single -->
              <div class="contact-one__infos-single">
                <div class="contact-one__infos-icon">
                  <i class="zimed-icon-message"></i>
                </div><!-- /.contact-one__infos-icon -->
                <div class="contact-one__infos-content">
                  <h3>Email</h3>
                  <p><a href="mailto:needhelp@zimed.com">needhelp@zimed.com</a></p>
                </div><!-- /.contact-one__infos-content -->
              </div><!-- /.contact-one__infos-single -->
              <div class="contact-one__infos-single">
                <div class="contact-one__infos-icon">
                  <i class="zimed-icon-phone-call"></i>
                </div><!-- /.contact-one__infos-icon -->
                <div class="contact-one__infos-content">
                  <h3>Phone</h3>
                  <p><a href="tel:666-888-0000">666 888 0000</a></p>
                </div><!-- /.contact-one__infos-content -->
              </div><!-- /.contact-one__infos-single -->
            </div><!-- /.contact-one__infos -->
          </div><!-- /.contact-one__content -->
        </div><!-- /.col-lg-6 -->
        <div class="col-lg-6">
          <div class="contact-one__form-wrap">
            <div class="block-title">
              <span class="block-title__bubbles"></span>
              <p>Contact Us Now</p>
              <h3>Write a Message</h3>
            </div><!-- /.block-title -->
            <form action="" class="contact-form-validated contact-one__form">
              <div class="row">
                <div class="col-md-6">
                  <input type="text" name="name" placeholder="Name">
                </div><!-- /.col-md-6 -->
                <div class="col-md-6">
                  <input type="text" name="email" placeholder="Email">
                </div><!-- /.col-md-6 -->
                <div class="col-md-6">
                  <input type="text" name="subject" placeholder="Subject">
                </div><!-- /.col-md-6 -->
                <div class="col-md-6">
                  <select name="discuss" class="selectpicker">
                    <option value="">Discussion For</option>
                    <option value="">Free Trial</option>
                    <option value="">Busniess Inquery</option>
                  </select>
                </div><!-- /.col-md-6 -->
                <div class="col-md-12">
                  <textarea name="message" placeholder="Message"></textarea>
                  <button type="submit" class="thm-btn contact-one__form-btn">Send Message</button>
                </div><!-- /.col-md-12 -->
              </div><!-- /.row -->
            </form><!-- /.contact-one__form -->
            <div class="result"></div><!-- /.result -->
          </div><!-- /.contact-one__form-wrap -->
        </div><!-- /.col-lg-6 -->
      </div><!-- /.row -->
    </div><!-- /.container -->
  </section>
</template>

<script>
    export default {
      name: "Contact"
    }
</script>

<style scoped>

</style>
