# Setup

A step-by-step guide of how this project was created.

```sh
# Following https://docs.nestjs.com/
$ npm i -g @nestjs/cli
$ nest new learn-nest
Which package manager would you love to use? npm

nest g controller cats
# Updated cats/cats.controller.ts

nest g service cats
# Updated cats/cats.service.ts

nest g interface cats/interfaces/cat
# Updated cats/interfaces/cat.interface.ts

nest g class cats/dto/create-cat.dto
# Updated cats/dto/create-cat.dto.ts

# Manually created mocks in cats/mocks

# Added tests that don't auto generate: app.module.spec.ts and main.spec.ts

# Updated @types/jest, jest, and ts-jest to latest versions

nest g module cats
# Updated cats/cats.module.ts

nest g middleware common/middleware/logger
nest g middleware cats/middleware/meow
```
