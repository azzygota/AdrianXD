const ai2d = require('@arugaz/ai2d')
exports.run = {
   usage: ['jadianime', 'toanime'],
  // hidden: ['alien', 'brick', 'bunny', 'caricature', 'clown', 'ink', 'latte', 'letter', 'pencil', 'puzzle', 'roses', 'sketch', 'splash', 'staco'],
   use: 'reply foto',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'jadianime') {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `Kirim gambar dengan caption atau reply ${isPrefix + command}`), m)
            let img = await q.download()
            if (!img) return client.reply(m.chat, Func.texted('bold', `Kirim gambar dengan caption atau reply ${isPrefix + command}`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let image = await scrap.uploadImage(img)
            await ai2d(image, {
               proxy: {
                  url: "http://101.32.184.53:3128",
                  chinese: true,
                  image: false,
               },
            }).then(async (h) => {
            //if (!result || result.constructor.name != 'String') return client.reply(m.chat, global.status.fail, m)
            client.sendFile(m.chat, h, ``, `*Anjai jadi Animeh :v*`, m)
           })
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error + ' mukanya kaga keliatan', m)
      }
   },
   error: false,
   limit: true
}