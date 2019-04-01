/* global WIKI */

// ------------------------------------
// GitHub Account
// ------------------------------------

const GitHubStrategy = require('passport-github2').Strategy

module.exports = {
  init (passport, conf) {
    passport.use('github',
      new GitHubStrategy({
        clientID: conf.clientId,
        clientSecret: conf.clientSecret,
        authorizationURL: `${conf.enterprise_instance_url}/login/oauth/authorize`,
        tokenURL: `${conf.enterprise_instance_url}/login/oauth/access_token`,
        userProfileURL: `${conf.enterprise_instance_url}/api/v3/user`,
        callbackURL: conf.callbackURL,
        scope: ['user:email']
      }, (accessToken, refreshToken, profile, cb) => {
        WIKI.models.users.processProfile(profile).then((user) => {
          return cb(null, user) || true
        }).catch((err) => {
          return cb(err, null) || true
        })
      }
      ))
  }
}
