#! /bin/bash

youtube-dl --playlist-start 75 -x --audio-format mp3 --audio-quality 0 "https://www.youtube.com/playlist?list=PLOdeqCXq1tXj1LvZ2uOgqkqbeI277vwuy" -o "%(playlist_index)s - %(title)s.%(ext)s"
