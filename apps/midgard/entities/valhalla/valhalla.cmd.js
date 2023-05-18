const dayjs = require('dayjs')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Colors } = require('../../helpers/colors')
const { MongoDb } = require('database')
const { SignJWT } = require('jose')
const { getUserRoles } = require('../../helpers/get-user-roles')
const { JWT_TOKEN, VALHALLA_URL } = require('../../utils/constants.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('valhalla')
    .setDescription('Accède au Valhalla !!'),
  async execute(interaction) {
    await MongoDb()

    const roles = Object.keys(getUserRoles(interaction)).filter(
      (role) => getUserRoles(interaction)[role]
    )

    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 60 * 5 // one hour

    const payload = {
      id: interaction.user.id,
      roles,
    }
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(JWT_TOKEN))

    const url = `${VALHALLA_URL}/?token=${token}`

    console.log(token)

    const Embed = new EmbedBuilder()
      .setColor(Colors.greenLight)
      .setTitle('Connexion au Valhalla')
      .setURL(url)
      .setDescription(
        `Ce lien de connexion expire ${dayjs().to(dayjs().add(5, 'hour'))}`
      )

      .setTimestamp()

    await interaction.reply({
      ephemeral: true,
      embeds: [Embed],
    })
  },
}
