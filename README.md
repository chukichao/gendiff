# Вычислитель отличий

### Сравнивает два переданных файла между собой и выводит результат сравнения в различных форматах.

_Установка:_

1. _Клонируйте данный репозиторий._
2. _Скачайте необходимые зависимости (запустить команду make install в корневой директории проекта)._
3. _Введите в консоль команду gendiff с указанием абсолютного или относительного пути до файлов (поддерживаются файлы с расширением json, yml/yaml) и формата вывода данных (через опцию -f, --format)._

_Доступные форматы вывода:_

- **stylish** - стилизованный формат вывода (по умолчанию).
- **plain** - формат вывода в виде списка.
- **json** - формат вывода в json.

_gendiff -h - для получения подробной информации о работе утилиты._

### Пример работы в различных форматах:

[![asciicast](https://asciinema.org/a/IfmuOzRX72osrrDFaVcYi0zu4.svg)](https://asciinema.org/a/IfmuOzRX72osrrDFaVcYi0zu4)

### Testing & Linting:

[![Actions Status](https://github.com/chukichao/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/chukichao/frontend-project-46/actions)
[![Actions Status](https://github.com/chukichao/frontend-project-46/actions/workflows/project-check.yml/badge.svg)](https://github.com/chukichao/frontend-project-46/actions)

### CodeClimate:

[![Maintainability](https://api.codeclimate.com/v1/badges/95cfeaa8a58997242984/maintainability)](https://codeclimate.com/github/chukichao/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/95cfeaa8a58997242984/test_coverage)](https://codeclimate.com/github/chukichao/frontend-project-46/test_coverage)
