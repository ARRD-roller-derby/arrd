const { MongoDb ,User} = require('database')
const { getUserRoles } = require('./get-user-roles')

async function getMe(interaction) {
  await MongoDb()
  const isExist = await User.count({ discordId: interaction.member.user.id })

  const roles = getUserRoles(interaction)
  const arrayRoles = Object.keys(roles).filter((role) => roles[role])

  if (!isExist)
    await User.create({
      discordId: interaction.member.user.id,
      wallet: 500,
      name: interaction.member.user.username,
      mst: false,
      msp: false,
    })

  const user = await User.findOne({ discordId: interaction.member.user.id })

  // Update roles
  if (!user.roles || user.roles.toString() !== arrayRoles.toString()) {
    user.roles = arrayRoles
    await user.save()
  }

  return await User.findOne({ discordId: interaction.member.user.id })
}

module.exports = { getMe }
