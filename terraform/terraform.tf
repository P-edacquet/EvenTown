terraform {
    required_providers {
        heroku = {
            source = "heroku/heroku"
            version = "4.2.0"
        }
    }
}

provider "heroku" {
    email   = var.email_address
    api_key = var.heroku_api_key
}

resource "heroku_app" "app_staging" {
    name = "eventown-staging"
    region = "eu"
}

resource "heroku_app" "app_production" {
    name = "eventown-production"
    region = "eu"
}

resource "heroku_pipeline" "pipeline" {
    name = "eventown"
}

resource "heroku_pipeline_coupling" "stage-staging" {
  app      = heroku_app.app_staging.name
  pipeline = heroku_pipeline.pipeline.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "stage-production" {
  app      = heroku_app.app_production.name
  pipeline = heroku_pipeline.pipeline.id
  stage    = "production"
}