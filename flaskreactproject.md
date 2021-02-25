

   ```bash
   heroku login
   ```


   ```bash
   heroku container:login
   ```



   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```


   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```


   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```


