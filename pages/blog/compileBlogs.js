

// var fs = require('fs')
// var path = require('path')

// function fnameToIden(fname) {
//     return `f_${fname}`
// }

// fs.readdir("./", (err, files) => {
//     if (err) {
//         console.log(err)
//     } 
//     let bp = files.filter(f => path.extname(f) === '.md')
//     let tlimp = "";
//     let tlexp = "const Blogs={"

//     for (let i = 0 ; i != bp.length; i++) {
//         let fname = bp[i].substring(0, bp[i].length-3)
//         let iden = fnameToIden(fname).replaceAll(" ", "_")

//         tlimp += `import ${iden} from \"./${bp[i]}\"\n`
//         tlexp += `\n\"${fname}\":${iden},`
//     }
//     tlexp += "\n}\n\nexport default Blogs"
//     tlimp += "\n\n"

//     fs.writeFile("./brepo.js", tlimp + tlexp, (err) => {
//         if (err) console.log("FAILED WRITE")
//     })

// })