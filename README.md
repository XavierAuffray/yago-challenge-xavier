yago-challenge-xavier

Usage
clone the repo
run the following commands:

--------
cd yago
```bundle install``` // (vim Gemifile to change the ruby version if yours is not the same !)
```rails db:create```
```rails db:migrate```
```rails db:seed```
```rspec ./spec``` (test)
```rails s```
-------

open a new tab in your terminal
run this command:
```current_path=$(pwd) | parent_path=$(dirname "$current_path") | frontend_path="$parent_path/frontend/index.html" | echo $frontend_path```
then paste the result in your favourite browser
