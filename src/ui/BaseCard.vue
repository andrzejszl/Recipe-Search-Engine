<template>
    <div class="card" v-if="props.type === 'standard'">
        <div class="title">{{ title }}</div>
        <img :src="image" alt="" class="image">
        <div class="summary" v-html="summary"></div>
    </div>
    <div class="card-mini" v-else-if="props.type === 'mini'">
        <div class="title">{{ title }}</div>
        <img :src="image" alt="" class="image">
    </div>
    <div class="card" v-else>
        <slot></slot>
    </div>
</template>
<script setup>
// eslint-disable-next-line
const props = defineProps({
    type: String,
    title: String,
    image: String,
    summary: String,
    id: String,
})


</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    background-color: #F3EFE0;
    margin: 0 auto;
    max-width: 40rem;
    padding: 20px;
    .title {
        font-size: 2.2rem;
        font-weight: bold;
        text-align: center;
        margin: 10px;
    }
    img {
        width: 400px;
        // min-height: 200px;
        margin: 10px auto;
        border-radius: 10px;
    }
    .summary {
        font-family: 'Roboto', sans-serif;
        text-align: justify;
        font-size: 1.2rem;
        padding: 20px;
        :-webkit-any-link {
            color: #22A39F;
        }
    }
}
.card-mini {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    background-color: #F3EFE0;
    margin: 20px auto;
    max-width: 40rem;
    padding: 20px;
    text-align: center;
    transition: all .2s ease-out;
    &:hover {
        box-shadow: 0 0 15px 5px#22A39F;
        transform: scale(1.1);
    }
    .title {
        font-size: 2rem;
        // font-weight: bold;
        // text-align: center;
        // margin: 10px;
    }
    img {
        max-width: 300px;
        // min-height: 200px;
        margin: 10px auto;
        // border-radius: 10px;
    }
}
</style>