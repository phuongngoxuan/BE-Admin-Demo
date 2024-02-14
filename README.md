## Running the app in the first time
### Remember install docker, docker-compose before run command below:
```bash
$ cp .env.example .env 

$ docker-compose up -d
```
## Migration:
 See in [link](MIGRATION.md)

## Seed:
```bash
$ yarn console:dev seed
```

## Test:
Prerequisites:
  - mysql client
     - MacOS:
     ```bash
     brew install mysql-client
     ```
     - Ubuntu:
     ```bash
     apt install mysql-client
     ```

Run test:
```bash
$ docker-compose up -d
$ yarn typeorm:run
$ make init-test
$ yarn test
```
Run crawl:
```bash
$ yarn console:dev crawl
```
## Environment

## Migrate
```bash
npm run typeorm migration:generate -- -n create_users_table
```

## run seeder
run seeder token:
```
yarn console:dev seeder-token
yarn console:dev seeder-user
```

## run crawler
start server :
```bash 
pm2 start -n "Astrone-Pepperfi-Be" "yarn start:dev" 
```

run crawl pool-bsc-factory :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Bsc-Pool-Factory" "yarn console:dev crawl-bsc-factory" --exp-backoff-restart-delay=100
```

run crawl pool-kcc-factory :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Kcc-Pool-Factory" "yarn console:dev crawl-kcc-factory" --exp-backoff-restart-delay=100
```

run crawl-linear-bsc-pool :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Bsc-Pool" "yarn console:dev crawl-bsc-pools" --exp-backoff-restart-delay=100
```

run crawl-linear-kcc-pool :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Kcc-Pool" "yarn console:dev crawl-kcc-pools" --exp-backoff-restart-delay=100
```

run crawl allocation-bsc-pool :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Bsc-Pool-Allocation" "yarn console:dev crawl-bsc-allocation-pool" --exp-backoff-restart-delay=100
```

run crawl allocation-kcc-pool :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Kcc-Pool-Allocation" "yarn console:dev crawl-kcc-allocation-pool" --exp-backoff-restart-delay=100
```

run crawl-token-info :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Token" "yarn console:dev crawl-token-info" --exp-backoff-restart-delay=100
```

run crawl-token-price :
```bash 
pm2 start -n "Astrone-Pepperfi-Crawl-Token" "yarn console:dev crawl-token-price" --exp-backoff-restart-delay=100
```

Powered by [Nest](https://github.com/nestjs/nest)

- Node: v14.17.0
- Yarn: v1.22.10

## Coding conventions
- Using space (not tab)
- Using absolute path: config in vscode: open settings.json -> setting 
    ```
      "javascript.preferences.importModuleSpecifier": "non-relative",
      "typescript.preferences.importModuleSpecifier": "non-relative" 
    ```
- RESTful API:
  - https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
  - https://betterprogramming.pub/22-best-practices-to-take-your-api-design-skills-to-the-next-level-65569b200b9
- Filename and URL path: using `-` as separator
- Name of file and class must use singular noun. Avoid using plural noun. Plural is used only with array of data.
- Avoid using `any` in `typescript` as much as possible
- Avoid `SELECT *` in `sql` query
- Except `entity.ts`, others should be named as plural (E.g: `orders.service.ts`, NOT `order.service.ts`)
- Code comment: prefer self-explanatory code, should comment at class and function level
- Columns in entity follow by camel case.
- Tables name in database follow plural noun.
- Using connection: report for read, master for write.
- Commit Convention: see in [link](CommitConversion.md)

## Some techniques
- Must read documentations: https://docs.nestjs.com/first-steps. Specially https://docs.nestjs.com/modules
- Hidden secret fields: https://docs.nestjs.com/techniques/serialization
- Database transaction: https://docs.nestjs.com/techniques/database#transactions
- Cron: https://docs.nestjs.com/techniques/task-scheduling. For catching error in cron, can try https://stackoverflow.com/questions/60402716/nestjs-handle-service-exceptions
