# Selenium vs Cypress
## Плюсы и минусы Cypress
### Плюсы
+ Легко найти элемент с нужным текстом на странице
+ Простая навигация по элементам страницы
+ Прост в настройке, не требуется дополнительная установка драйверов
+ Легкое мокирование внешнего сервиса с помощью `intercept`
### Минусы
+ Медленная работа (на запуск требуется ~30 секунд; Selenium справляется с тестом за 10 секунд)
+ Не очень удобный интерфейс (удобнее, когда "запустил и все работает")
## Плюсы и минусы Selenium
### Плюсы
+ Много подробной информации по теме
+ Простые и понятные методы навигации, без "темной магии" под капотом
+ Быстрая работа
+ Возможность использовать разнообразный парк драйверов и окружений, в том числе удаленно
### Минусы
+ Слишком простые методы навигации - просто найти элемент с нужным текстом не выйдет
+ Требуется установка драйвера или удаленный сервер
# Заключение
Оба фреймворка имеют довольно разную идеологию использования. Selenium стремится быть
как можно ближе к конкретным действиям пользоователя, вплоть до конкретного выбора
каждого элемента или посивольного заполнения формы, тогда как Cypress подходит к процессу
более абстрактно, производя поиск по элементам без особой необходимости знать, как
конкретно выглядит этот элемент.