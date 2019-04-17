# ERAchainWEBwallet
По умолчанию используется публичный узел http://explorer.erachain.org:9047
Узел для разработчиков ERA chain http://explorer.erachain.org:9067

Desktop wallet version: https://github.com/aufklaerer/ERAchainWEBwallet/tree/master/desktop-ver

библиотека функций обеспечивающих выполнений базовых функций ERA chain на JavaScript ./lib/eralib.js (формирование, подписание и отправление в блокчейн транзакций)

Для работы с блокчейном у вас есть Base seed, на основании него вы мождеет создать серию счетов, по умолчанию через веб интерфейс создается один такой счет.

Что бы использовать какой то определенный ваш счёт, вам нужно выполнить следующую последовательность действий:
1. В Desktop узле скопировать account
2. В нижней панели нажать на замочек, unlock wallet
2. Далее File -> Debug
3. Выполнить GET addresses/seed/{account address}


## Для разработчиков
Никаких билдеров и сборщиков не нужно. Это обычный html с jquery. Для запуска и теста достаточно просто открыть в браузере index.html.