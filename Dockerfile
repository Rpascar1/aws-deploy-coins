# Base image
FROM ruby:2.6.6
# gets the docker image of ruby 2.5 and lets us build on top of that

RUN apt-get update -qq && apt-get install -y build-essential apt-utils libpq-dev nodejs curl nano
#updates and installs depenencies and packages such as nodje curl and nano for running application and command
#line tests later on

RUN mkdir /my_app
WORKDIR /my_app
# create a folder /myapp in the docker container and go into that folder

COPY Gemfile /my_app/Gemfile
RUN gem install bundler -v 2.1.4

COPY Gemfile.lock /my_app/Gemfile.lock
# Copy the Gemfile and Gemfile.lock from app root directory into the /myapp/ folder in the docker container

RUN bundle install
# Run bundle install to install gems inside the gemfile

COPY . /my_app
# Copy the whole app

CMD bundle exec rails server -b 0.0.0.0 -p 8080
#Runs commands to start application and bind server to 0.0.0.0 port 8080 for http traffic
