## ArcheAge боты для AFK отслеживания радара корабля или сухопутных маршрутов
## Автоматически отправляет скришноты игроков и кораблей в Telegram чат с вами!

> После настройки вы можете оставлять персонажей на радаре или в невидимости на суше если в их видимости появятся игроки, вы автоматически выберете их целью (наведетесь на корабль) и сделаете скриншот, который будет отправлен в чат телеграм, для этого нужно будет создать телеграм бота, воспользовавшись любой инструкцией из [документации Telegram](https://core.telegram.org/api) и добавить в файл config.js данные о вашем чате с ботом и токен бота, остальное уже настроено.
> Лучше всего использовать если у вас несколько ПК

## После настройки можете спокойно оставлять компьютер(ы) и ждать сообщений в Telegram.

В данном проекте используется [oblitum/interception](https://github.com/oblitum/Interception) и [node-interception](https://github.com/Rami-Sabbagh/node-interception). Interception необходимо установить отдельно.


## Stack
 - Interception (send fake keytaps to game)
 - NodeJS
 - RobotJS
 - Telegram bot api