<template>
    <div class="c-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="c-icon__svg"
          :width="width"
          :height="height"
          :viewBox="viewBox"
        >
          <path :d="svgPath"></path>
        </svg>
    </div>
</template>

<script>
  export default {
    name: 'CIcon',
    data(){
      return {
        src:''
      }
    },
  props: {
    iconName: {
      type: String,
    },
  },
  computed:{
    width({src}){
      return src.width
    },
    height({src}){
      return src.height
    },
    viewBox({width, height}){
      return `0 0 ${width} ${height}`
    },
    svgPath({src}){
      return src.svgPath
    }
  },
  async created(){
    const iconData = await import(`../assets/icons/${this.iconName}.js`)
    this.src = { ...iconData }
  }
}
</script>

<style>
.c-icon__svg{
  fill: var(--color-button-light);
  cursor:pointer;
  transition: all ease 0.3s;
}
.c-icon__svg:hover{
    transform: scale(1.1);
  }
</style>