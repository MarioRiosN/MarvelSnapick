<template>
    <button class="c-button" :id="id" :innerText="innerText"></button>
</template>

<script>
export default{
    name: 'CButton',
    props:{
        id:{
            type: String,
            default:'',
        },
        innerText:{
            type: String,
            default:'',
        }
    }
};
</script>

<style>
/*.c-button{
    background-color: var(--color-button);
    color: var(--color-font);
    border: none;
    padding: 5px;
    font-weight: bold;
    box-shadow: 4px 4px 8px 0 var(--color-button-hover);
    border-radius: 10%;
}
.c-button:hover{
    cursor: pointer;
    box-shadow: 8px 8px 16px 0 var(--color-button-hover);
    background-color: var(--color-button-hover);
}*/

.c-button {
  padding: 5px;
  color: var(--color-font);
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  background: var(--color-button);
  /*background: linear-gradient(0deg, rgba(96,9,240,1) 0%, rgba(129,5,240,1) 100%);*/
  border: none;
}

/*.c-button:before {
  height: 0%;
  width: 2px;
}*/
.c-button:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
    background: var(--color-button-hover);
}
</style>
