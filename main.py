from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

dirname = 'static/playlist'


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                            'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    songs = []
    for song in os.listdir(dirname):
        if song.split('.')[-1] == 'mp3':
            songs.append(song)

    songs.sort(key=lambda s: s.split('-')[0])

    return render_template('index.html', songs=songs)
