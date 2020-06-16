# Base image
FROM ruby:2.6.6
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs curl nano
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler -v 2.1.4
RUN bundle install
COPY . /myapp
EXPOSE 3000
EXPOSE 5432
CMD bundle exec rails server -b 0.0.0.0 -p 8080
