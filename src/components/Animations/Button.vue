<template>
    <button id="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        load: Boolean
    },
    methods: {
        toggleLoad() {
            const elem = document.getElementById('btn').classList;
            if (elem.contains("load")) return elem.remove("load");
            elem.add("load");
        }
    },
    watch: {
        load() {
            this.toggleLoad();
        }
    },
}
</script>

<style scoped>
#btn {
    width: 80px;
    height: 35px;
    letter-spacing: 1px;
    cursor: pointer;
    position: relative;
}

#btn.load::after {
    content: '';
    border: 4px solid #f3f3f3;
    border-top: 4px solid #9146FF;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    position: absolute;
    right: -30px;
    top: 3px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>