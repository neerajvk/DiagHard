from app import app

debug = False

if app.config['DEBUG']:
    debug = True

app.run(port=8080, debug=debug)