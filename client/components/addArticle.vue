<template lang="">
    <div>
        <form @submit="postData" method="post">
        <div>
        <label for="tool_name"> Nom de l'article</label>
        <input  type="text" id="tool_name" name="tool_name" v-model="post.tool_name" placeholder="Nom de l'article">
        </div>
        <div>
        <label for="tool_category"> catégorie</label>
        <select  id="tool_category" name="tool_category" v-model="post.tool_category" placeholder="Catégorie">
        <option value="high weight"> high weight </option>
        <option value="low weight"> low weight </option>
        </select>
        </div>
        <div>
        <label for="price_rental_day"> prix (j) </label>
        <input type="number" id="price_rental_day" v-model="post.price_rental_day" name="price_rental_day" placeholder="prix de l'article par jour">
        </div>
        <div>
        <label for="libre"> libre </label>
        <input type="number" id="libre" v-model="post.libre" name="price_rental_day" placeholder="libre">
        </div>
        <div>
        <label for="rentor"> rentor </label>
        <input type="number" id="rentor" v-model="post.rentor" name="rentor" placeholder="rentor">
        </div>
        <div>
        <button type="submit"> enregistrer </button>
        </div>
        </form>
        <div id='errorForm'></div>
    </div>
</template>
<script>
     import axios from 'axios'

export default {

  components: {

  },
  mounted() {

  },
  data() {
    return {
      post:{
        tool_name:null,
        tool_category : null,
        price_rental_day: null,
        libre:null,
        rentor:null
        }
    }
  },
  
methods: {
 postData(e){
     axios.post('http://localhost:80/Tools',this.post).then((result)=>{
         this.post.tool_name=null;
         this.post.tool_category=null;
         this.post.price_rental_day=null;
         this.post.libre=null;
         this.post.rentor=null;
     }).catch((err)=>{
       console.log(err)
     })
     e.preventDefault();
     
 }
},


}
</script>
<style lang="">
    
</style>