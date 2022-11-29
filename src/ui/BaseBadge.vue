<template>
    <span class="badge">{{ text }}</span>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
    text: String,
})
</script>

<style lang="scss" scoped>
.badge {
    // cursor: pointer;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    background-color: #22A39F;
    color: white;
    text-shadow: 0 0 3px #222;
    // transition: transform .2s ease-out;
    // &:hover {
    //     transform: scale(1.1);
    // }
}
</style>