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
CMD bundle exec rails server -b 0.0.0.0 -p 8080

# Configure an entry point, so we don't need to specify
# "bundle exec" for each of our commands.
# FROM ruby:2.6.6
# # RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs curl nano
# # # Configure the main working directory. This is the base
# # # directory used in any further RUN, COPY, and ENTRYPOINT
# # # commands.
# # RUN mkdir -p /app
# # WORKDIR /app
# # # Copy the Gemfile as well as the Gemfile.lock and install
# # # the RubyGems. This is a separate step so the dependencies
# # # will be cached unless changes to one of those two files
# # # are made.
# # COPY Gemfile Gemfile.lock ./
# # RUN gem install bundler && bundle install --jobs 20 --retry 5
# # # Copy the main application.
# # COPY . ./
# # # Expose port 3000 to the Docker host, so we can access it
# # # from the outside.
# # EXPOSE 3000
# # # The main command to run when the container starts. Also
# # # tell the Rails dev server to bind to all interfaces by
# # # default.
# # CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
# # ENTRYPOINT ["bundle", "exec"]
# # # The main command to run when the container starts. Also
# # # tell the Rails dev server to bind to all interfaces by
# # # default.
# CMD ["rails", "server", "-b", "0.0.0.0"]
