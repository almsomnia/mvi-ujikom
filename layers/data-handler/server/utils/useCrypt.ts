import bcrypt from "bcrypt"

export default function () {
   async function hash(text: string, saltRounds: number = 10) {
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(text, salt)
      return hash
   }

   async function compare(text: string, hash: string) {
      return await bcrypt.compare(text, hash)
   }

   return {
      hash,
      compare
   }
}