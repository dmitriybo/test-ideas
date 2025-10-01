import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ideas = [
    {
      title: 'Добавить тёмную тему',
      description: 'Позволить пользователям переключаться на тёмную тему интерфейса',
    },
    {
      title: 'Интеграция с календарём',
      description: 'Синхронизация с Google Calendar и Outlook',
    },
    {
      title: 'Мобильное приложение',
      description: 'Создать приложение для iOS и Android',
    },
    {
      title: 'Автоматические уведомления',
      description: 'Отправка уведомлений о новых функциях и обновлениях',
    },
    {
      title: 'Расширенный поиск',
      description: 'Поиск по тегам, дате и популярности',
    },
    {
      title: 'Пользовательские профили',
      description: 'Добавить возможность редактировать свой профиль и аватар',
    },
    {
      title: 'Социальное взаимодействие',
      description: 'Лайки, комментарии и подписки на идеи',
    },
    {
      title: 'Экспорт данных',
      description: 'Возможность выгрузки данных в CSV или PDF',
    },
    {
      title: 'API для разработчиков',
      description: 'Предоставить REST API для интеграции с другими сервисами',
    },
    {
      title: 'Аналитика использования',
      description: 'Панель статистики для администраторов и продуктовой команды',
    },
  ];

  for (const idea of ideas) {
    await prisma.idea.create({ data: idea });
  }

  console.log('Seed успешно выполнен!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
