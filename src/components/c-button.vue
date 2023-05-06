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

<style lang="scss">
/* .c-button{
    background-color: var(--color-button);
    color: var(--color-background-light);
    border: none;
    padding: 5px;
    font-weight: bold;
    box-shadow: 0px 4px 8px 0 var(--color-button-hover);
}
.c-button:hover{
    cursor: pointer;
    box-shadow: 0px 8px 16px 0 var(--color-button-hover);
} */
.c-button {
    padding: 5px;
    color: var(--color-background-dark);
    border-radius: 5px;
    padding: 10px 25px;
    /* font-family: 'Lato', sans-serif; */
    /* font-weight: 500; */
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 8px 0 var(--color-button-hover);
    /* box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1); */
    outline: none;
    /* background: var(--color-button); */
    background: radial-gradient(circle, var(--color-button-light) 0%, var(--color-button-dark) 100%);
    /*background: linear-gradient(0deg, rgba(96,9,240,1) 0%, rgba(129,5,240,1) 100%);*/
    border: none;
}

/*.c-button:before {
  height: 0%;
  width: 2px;
}*/
.c-button:hover {
    box-shadow:  0px 4px 6px 0 rgba(255,255,255,.5),
                0px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset 0px -4px 6px 0 rgba(255,255,255,.2),
    inset 0px 4px 6px 0 rgba(0, 0, 0, .4);
    background: var(--color-button-hover);
    color: var(--color-font-button-hover);
}
</style>
