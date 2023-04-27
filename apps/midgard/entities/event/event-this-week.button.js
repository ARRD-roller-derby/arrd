const { EmbedBuilder } = require('discord.js')
const { NjordDb, Event } = require('database')
const { EventsCustomId } = require('./events.custom-id')
const dayjs = require('dayjs')
const { EventType } = require('./event-type')
const validator = require('validator')
const { Colors } = require('../../helpers/colors')

module.exports = {
  customId: EventsCustomId.thisWeek,
  execute: async (interaction) => {
    await interaction.deferUpdate()
    await NjordDb()

    const events = await Event.find({
      start: { $gte: dayjs().subtract(1, 'day').format('YYYY-MM-DD') },
      end: { $lte: dayjs().endOf('week').format('YYYY-MM-DD') },
    }).sort({ start: 1 })

    const eventListEmbed = new EmbedBuilder()
      .setColor(Colors.greenDark)
      .setTitle('Cette semaine')
      .setDescription(
        `${events.length} événement${events.length > 1 ? 's' : ''}
        ___`
      )
      .addFields(
        events.map((event) => ({
          name: `${dayjs(event.start).format('dddd')}`,
          value: `__${event.hourStart} à ${event.hourEnd}__ - **${
            event.title || EventType?.[event.type]
          }** \n
          ${validator.unescape(event.description)}
          ___`,
        }))
      )
      .setTimestamp()

    await interaction.editReply({
      ephemeral: true,
      embeds: [eventListEmbed],
    })
  },
}
