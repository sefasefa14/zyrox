const { ShardingManager } = require(`discord.js`)
const ayarlar = require(`./ayarlar.json`)

const shards = new ShardingManager(`./server.js`, {
token : ayarlar.token,
totalShards : 2 })

shards.spawn()