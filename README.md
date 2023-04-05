# web-chat-js-app

Простой чат для общения с авторизацией

## Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск приложения в режиме разработки,
- `npm start` — запуск приложения на http://localhost:3000,
- `npm run lint` — запуск линтинга кода,
- `npm run build` — сборка стабильной версии,
- `npm run format` — запуск форматиирования,
- `npm run docker:run` — запуск docker container,
- `npm run test` — запуск тестов.

## Ссылки проекта

-   [Figma Link](https://www.figma.com/file/IdwNJLlJbV5wUAZMMTfbLq/web-chat-js-app?node-id=0%3A1&t=NxeGuDHLfr2HN2lK-0)
-   [Netlify Link](https://guileless-licorice-d5ec7d.netlify.app/)
	[YandexCloud](https://bbaqas5iaphn9nf82ekl.containers.yandexcloud.net/)
- 
## Основные классы

- Для управления и подпсиок на события используется класс <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/main/src/utils/EventBus.ts" target="_blank" title="EventBus">EventBus</a>
- Базовый компонент <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/main/src/utils/Block.ts" target="_blank" title="Block">Block</a>
- Класс для общения с Backend <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/sprint_4/src/utils/HTTPTransport.ts" target="_blank" title="HTTPTransport">HTTPTransport</a>
- Для работы с сообщениями в чатах, создан класс <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/sprint_4/src/utils/WSTransport.ts" target="_blank" title="WebSockets">WebSockets</a>
- Для роутинга приложения реализован класс <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/main/src/utils/Router.ts" target="_blank" title="Router">Router</a>
- Для стейт менеджера используется класс  <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/main/src/utils/Store.ts" target="_blank" title="Store">Store</a>
- Вспомогательный файл   <a href="https://github.com/laksan1/middle.messenger.praktikum.yandex/blob/main/src/utils/helpers.ts" target="_blank" title="Helper">Helper</a>


## Backend API

- <a href="https://ya-praktikum.tech/api/v2/swagger/#/" target="_blank" title="API">Swagger UI</a>
