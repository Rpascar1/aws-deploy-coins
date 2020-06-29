# TossACoinToYourWitcher

This is a modified pig game variant app that stores player data in a JSON Object and displays game stats. If a player already exists the profile is used and stats updated via the rails API and Postegres Database. No password is necessary a player is created or found and used by typing in a player name.

See it live here = https://tossacoin.herokuapp.com/
Please be aware that since this app is hosted on Heroku there may be a loading period. 


## Installation
clone this repo git@github.com:Rpascar1/railsJsAPI.git

The download may take a minute or 2 depending on your connection due to file size.

Add this line to your application's Gemfile if it does not exist:

```ruby
gem 'pg'
# gem 'sqlite3', '~> 1.4'
```
And then execute:

    $ bundle install

    start your Postgres server
    navigate to the railsJsApiProgram folder with the terminal
    and run rails db:create
    run rails db:migrate
    run rails s to start a rails server - the only api server for this app

## Usage

  navigate to
  http://witcher-rails-docker-alb-1580258293.us-east-1.elb.amazonaws.com//api/v1/players/ to see the player JSON
  ![Imgur](https://i.imgur.com/nn9atxr.pngs=200)
  ![Imgur](https://i.imgur.com/UFvh1k7.pngs=200)
  ![Imgur](IMAGES/JSONPLAYERS.png)
  http://witcher-rails-docker-alb-1580258293.us-east-1.elb.amazonaws.com//api/v1/games to see the GAME json which also contains the player data
  ![Imgur](IMAGES/JSONGAME.png)

To play the game copy the full index.html path which may look something like this if cloned to the desktop -
file:///Users/User/Desktop/railsJsAPI/JS-FRONTEND/frontEnd/index.html

In the terminal navigate to file:////Users/user/Desktop/TossACoinAPI_Rails/railsJsAPI/jsApiProgram and start the Rails server using the rails s command.

Enter a name for player one and player 2 this will create the player profile.
Set the score limit if no score limit is set default value is 100 to win.
If a 1 is card is drawn with 0 points will display. If you had point they will be lost.
If you want to save the points and not risk losing them click hold.
Your turn will end.
if tow sixes are rolled consecutively you will lose all acumulated points not just the points for this turn.

The stats for nerds button displays real stats about the current game. Click to open and close.

## License
https://opensource.org/licenses/MIT

## Development



## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Rpascar1/railsJsAPI.
