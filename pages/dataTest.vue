<script setup>
async function getInfo() {
    const result = await client.query('SELECT * from Play_Type limit 10');
    if (error) {
        console.log(error)
    }
    console.log(result)
}
</script>
<template>
    <p>whats goin on here</p>
    <button @click="getInfo">click me</button>
</template>